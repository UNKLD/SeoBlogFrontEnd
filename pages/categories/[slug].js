import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import Card from '../../components/blog/Card'
import { singleCatagory } from '../../actions/catagory'
import { API, DOMAIN, APP_NAME } from '../../config'
import renderHtml from 'react-render-html';
import moment from 'moment';

const Category = ({catagory, blogs}) => {

  const head = () => (
      <Head>
        <title>{catagory.name} | {APP_NAME}</title>
        <link rel="canonical" href={`${DOMAIN}/categories/${catagory.slug}`} />
        <meta name="description" content={`Best Catagory for ${catagory.name}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={`${catagory.name} | ${APP_NAME}`} />
        <meta property="og:description" content={`Best Catagory for ${catagory.name}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOMAIN}/catagories/${catagory.slug}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />

        <meta property="og:image" content={`${DOMAIN}/images/animeblog.jpg`} />
        <meta property="og:image:secure_url" content={`${DOMAIN}/images/animeblog.jpg`} />
        <meta property="og:image:type" content="image/jpg" />

      </Head>
  )

    return (
      <>
        {head()}
        <Layout>
          <main>
            <div className="container-fluid text-center">
              <header>
                <div className="col-md-12 pt-3">
                  <h1 className="display-4 font-weight-bold">
                    {catagory.name}
                  </h1>
                  {blogs.map((b, i) => (
                    <div>
                      <Card key={i} blog={b} />
                      <hr/>
                    </div>
                  ))}
                </div>
              </header>
            </div>
          </main>
        </Layout>
      </>
    )
}

Category.getInitialProps = ({query}) => {
  return singleCatagory(query.slug).then(data => {
    if (data.error) {
      console.log(data.error)
    } else {
      return {catagory: data.catagory, blogs: data.blogs}
    }
  })
}

export default Category
