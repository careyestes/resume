import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
// import { getSortedPostsData } from '../lib/posts';
import classNames from 'classnames';

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <Layout location='home'>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      
      <section>
        
        <h1>The Audit landing page will go here</h1>

      </section>
    </Layout>
  );
}