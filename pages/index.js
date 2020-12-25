/* 
  Pre-rendering:
    By default, Next.js pre-renders every page. 
    This means that Next.js generates HTML for each page in advance, 
    instead of having it all done by client-side JavaScript. 
    Pre-rendering can result in better performance and SEO.

    Each generated HTML is associated with minimal JavaScript code necessary for that page. 
    When a page is loaded by the browser, its JavaScript code runs and makes the page 
    fully interactive. (This process is called "hydration".)

  Two Forms of Pre-rendering:
    Next.js has two forms of pre-rendering: "Static Generation" and "Server-side Rendering". 
    The difference is in when it generates the HTML for a page.

    A."Static Generation" (with and without data): is the pre-rendering method that generates the HTML at "build time". 
    The pre-rendered HTML is then reused on each request.
    We recommend using Static Generation (with and without data) whenever possible 
    because your page can be built once and served by CDN, 
    which makes it much faster than having a server render the page on every request.
    You can use Static Generation for many types of pages, including:
      - Marketing pages
      - Blog posts
      - E-commerce product listings
      - Help and documentation

    B. "Server-side Rendering" (with data) is the pre-rendering method that generates the HTML 
    on each request.

    You should ask yourself: "Can I pre-render this page ahead of a user's request?" 
    If the answer is yes, then you should choose Static Generation.
    On the other hand, Static Generation is not a good idea if you cannot pre-render a page 
    ahead of a user's request. Maybe your page shows frequently updated data, and 
    the page content changes on every request.
    In that case, you can use Server-side Rendering. It will be slower, but the 
    pre-rendered page will always be up-to-date. Or you can skip pre-rendering and 
    use client-side JavaScript to populate frequently updated data.

  Client-side Rendering:
    If you do not need to pre-render the data, you can also use the following strategy 
    called "Client-side Rendering" (Static Generation without data + fetch data on Client-side):
      - Statically generate (pre-render) parts of the page that do not require external data.
      - When the page loads, fetch external data from the client using JavaScript and 
        populate the remaining parts.
    This approach works well for user dashboard pages, for example. Because a dashboard 
    is a private, user-specific page, SEO is not relevant, and the page doesn’t need to 
    be pre-rendered. The data is frequently updated, which requires request-time data fetching.
*/
import Head from 'next/head';
import Link from 'next/link';

import Layout, { siteTitle } from '../components/layout';
import Date from '../components/date';
import { getSortedPostsData } from '../lib/posts';

import utilStyles from '../styles/utils.module.css';

/* Fetching Data at Build Time: "Static Generation"
  getStaticProps:
    "getStaticProps" only runs on the server-side. It will never run on the client-side.
    In development (npm run dev or yarn dev), getStaticProps runs on every request.
    In production, getStaticProps runs at build time. However, this behavior can 
    be enhanced using the fallback key returned by getStaticPaths.

  getStaticPaths:
    Like getStaticProps, getStaticPaths can fetch data from any data source. 
    In development (npm run dev or yarn dev), getStaticPaths runs on every request.
    In production, getStaticPaths runs at build time.
*/
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

/* Fetching Data at Request Time: "Server-side Rendering"
  getServerSideProps:
    If you need to fetch data at request time instead of at build time, 
    you can try Server-side Rendering:

    You should use getServerSideProps only if you need to pre-render a page whose 
    data must be fetched at request time. Time to first byte (TTFB) will be slower 
    than getStaticProps because the server must compute the result on every request, 
    and the result cannot be cached by a CDN without extra configuration.
*/
/* export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
} */

/* Fetching Data at Request Time: "Client-side Rendering"
  SWR:
    The team behind Next.js has created a React hook for data fetching called SWR. 
    We highly recommend it if you’re fetching data on the client side.
    It handles caching, revalidation, focus tracking, refetching on interval, and more. 
*/
/* import useSWR from 'swr';
function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
} */

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello, I'm Rama. I'm a Software Engineer and a
          Translator(English/Hindi). You can contact me on Twitter.{' '}
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
