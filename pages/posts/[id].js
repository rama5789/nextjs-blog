import Head from 'next/head';

import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';

import utilStyles from '../../styles/utils.module.css';

/* getStaticPaths:
  Fallback:
    - If fallback is 'false', then any paths not returned by getStaticPaths will result 
    in a 404 page.
    - If fallback is 'true', then the behavior of getStaticProps changes:
      - The paths returned from getStaticPaths will be rendered to HTML at build time.
      - The paths that have not been generated at build time will not result in 
      a 404 page. Instead, Next.js will serve a “fallback” version of the page on the 
      first request to such a path.
      - In the background, Next.js will statically generate the requested path. 
      Subsequent requests to the same path will serve the generated page, just like other pages 
      pre-rendered at build time.
    - If fallback is 'blocking', then new paths will be server-side rendered with 
    getStaticProps, and cached for future requests so it only happens once per path.

  Catch-all Routes:
    Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets. 
    e.g. pages/posts/[...id].js matches /posts/a, but also /posts/a/b, /posts/a/b/c and so on.

    If you do this, in getStaticPaths, you must return an array as the value of the id key like so:
    return [{
        params: {
          // Statically Generates /posts/a/b/c
          id: ['a', 'b', 'c']
        }
      }]
    And params.id will be an array in getStaticProps:
    export async function getStaticProps({ params }) {
      // params.id will be like ['a', 'b', 'c']
    }
*/
export async function getStaticPaths() {
  // Return a list of possible value for "id"
  const paths = getAllPostIds();
  // paths = [
  //   { params: { id: 'ssg-ssr' }},
  //   { params: { id: 'pre-rendering' }},
  // ]
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using "params.id"
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

/* 
  Access Pages at:
    http://localhost:3000/posts/ssg-ssr
    http://localhost:3000/posts/pre-rendering
*/
