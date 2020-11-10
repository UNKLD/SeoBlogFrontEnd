import Head from 'next/head';
import Layout from '../../components/Layout';
import Card from '../../components/blog/Card';
import { singleTag } from '../../actions/tag';
import { DOMAIN, APP_NAME } from '../../config';

const Tag = ({ tag, blogs }) => {
  const head = () => (
    <Head>
      <title>
        {tag.name} | {APP_NAME}
      </title>
      <link rel='canonical' href={`${DOMAIN}/tags/${tag.slug}`} />
      <meta
        name='description'
        content={`Tag u'r favorite anime with ${tag.name}`}
      />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />

      <meta property='og:title' content={`${tag.name} | ${APP_NAME}`} />
      <meta
        property='og:description'
        content={`Tag u'r favorite anime with ${tag.name}`}
      />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={`${DOMAIN}/tags/${tag.slug}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />
      <meta property='og:image' content={`${DOMAIN}/images/animeblog.jpg`} />
      <meta
        property='og:image:secure_url'
        content={`${DOMAIN}/images/animeblog.jpg`}
      />
      <meta property='og:image:type' content='image/jpg' />
    </Head>
  );

  return (
    <>
      {head()}
      <Layout>
        <main>
          <div className='container-fluid text-center'>
            <header>
              <div className='col-md-12 pt-3'>
                <h1 className='display-4 font-weight-bold'>{tag.name}</h1>
                {blogs.map((b, i) => (
                  <div>
                    <Card key={i} blog={b} />
                    <hr />
                  </div>
                ))}
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </>
  );
};

Tag.getInitialProps = ({ query }) => {
  return singleTag(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { tag: data.tag, blogs: data.blogs };
    }
  });
};

export default Tag;
