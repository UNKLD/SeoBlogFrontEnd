import Link from "next/link";
import Layout from "../components/Layout";

const index = () => {
  return (
    <Layout>
      <article>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-4 font-weight-bold">SEO blogs for all</h1>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center pt-4 pb-5">
              <p className="lead">Write your own blog about your favorite topic</p>
            </div>
          </div>
        </div>

        <div className="container-fluid index">
          <div className="row">
            <div className="col-md-4 card-container">
              <div className="card-flip">
                <div
                  className="card front"
                  style={{ backgroundImage: "url(/images/blog.jpg)" }}
                ></div>
                <div className="card back text-center">
                  <Link href="/categories/blog">
                    <a>
                      <h3 className="h1">Blogging</h3>
                    </a>
                  </Link>
                  <p className="text-light lead">Ready to write your best blog.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 card-container">
              <div className="card-flip">
                <div
                  className="card front"
                  style={{ backgroundImage: "url(/images/seo.webp)" }}
                ></div>
                <div className="card back text-center">
                  <Link href="/categories/seo">
                    <a>
                      <h3 className="h1">Seo</h3>
                    </a>
                  </Link>

                  <p className="text-white lead">
                    Everything you write instantly indexed.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 card-container">
              <div className="card-flip">
                <div
                  className="card front"
                  style={{ backgroundImage: "url(/images/random-img.jpg)" }}
                ></div>
                <div className="card back text-center">
                  <Link href="/tags/covid">
                    <a>
                      <h3 className="h1">Covid</h3>
                    </a>
                  </Link>
                  <p className="text-white lead">More pandemic info.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};
export default index;
