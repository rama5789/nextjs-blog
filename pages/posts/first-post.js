/* 
  Client-Side Navigation:
    The Link component enables "client-side navigation" between 
    two pages in the same Next.js app.
    "Client-side navigation" means that the page transition happens using JavaScript, 
    which is faster than the default navigation done by the browser because the browser 
    never loads the full page.

  Code splitting and prefetching:
    Next.js does code splitting automatically, so each page only loads what’s 
    necessary for that page. That means when the homepage is rendered, the code for 
    other pages is not served initially.
    Furthermore, in a production build of Next.js, whenever "Link" components appear 
    in the browser’s viewport, Next.js automatically "prefetches" the code for the 
    linked page in the background. By the time you click the link, the code for 
    the destination page will already be loaded in the background, and the page 
    transition will be near-instant!
  
  Metadata:
    <Head> is a React Component that is built into Next.js. 
    It allows you to modify the <head> of a page.

  Note:
    No routing libraries are required.
    If you need to link to an external page outside the Next.js app, just use an <a> tag 
    without Link.
*/
import Head from 'next/head';
import Link from 'next/link';

import Layout from '../../components/layout';

// The component can have any name, but you must export it as a default export.
export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
}

/* 
   Access Page at: http://localhost:3000/posts/first-post
*/
