import Link from 'next/link';
import Layout from '../components/Layout';

const index = () => {
  return (
    <Layout>
      <article>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <h1 className='display-4 font-weight-bold'>
                Anime blogs for all
              </h1>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center pt-4 pb-5'>
              <p className='lead'>
                Write your own blog about your Favorite anime
              </p>
            </div>
          </div>
        </div>

        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-4 card-container'>
              <div className='card-flip'>
                <div
                  className='card front'
                  style={{ backgroundImage: 'url(/images/image1.jpg)' }}></div>
                <div className='card back text-center'>
                  <Link href='/categories/Adventure'>
                    <a>
                      <h3 className='h1'>Adventure</h3>
                    </a>
                  </Link>
                  <Link href='/categories/Action'>
                    <a>
                      <h3 className='h2'>Action</h3>
                    </a>
                  </Link>
                  <p className='text-light lead'>
                    Ready to expolre another world beyond your imagination
                  </p>
                </div>
              </div>
            </div>

            <div className='col-md-4 card-container'>
              <div className='card-flip'>
                <div
                  className='card front'
                  style={{ backgroundImage: 'url(/images/image2.jpg)' }}></div>
                <div className='card back text-center'>
                  <Link href='/categories/Crime'>
                    <a>
                      <h3 className='h1'>Crime</h3>
                    </a>
                  </Link>
                  <Link href='/categories/Magic'>
                    <a>
                      <h3 className='h2'>Magic</h3>
                    </a>
                  </Link>
                  <p className='text-white lead'>
                    You'll know everything you need to be a badass
                  </p>
                </div>
              </div>
            </div>

            <div className='col-md-4 card-container'>
              <div className='card-flip'>
                <div
                  className='card front'
                  style={{ backgroundImage: 'url(/images/image3.jpg)' }}></div>
                <div className='card back text-center'>
                  <Link href='/tags/anime'>
                    <a>
                      <h3 className='h1'>Anime</h3>
                    </a>
                  </Link>
                  <p className='text-white lead'>
                    Just all you want to find out and watch
                  </p>
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
