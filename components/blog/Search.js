import { useState, useEffect } from 'react'
import Link from 'next/link'
import renderHtml from 'react-render-html';
import { listSearch } from '../../actions/blog'

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results:'',
    searched: false,
    message: ''
  })

  const { search, results, searched, message } = values

  const searchSubmit = (e) => {
      e.preventDefault()
      listSearch({search}).then(data => {
        setValues({...values, results: data, searched: true, message: `${data.length} blogs found`})
        console.log(message)
      })
  }
  const handleChange = (e) => {
      setValues({...values, search: e.target.value, searched: false, results: []})
  }

  const searchedBlogs = (results = []) => {
      return (
        <div className="jumbotron bg-white">
          {message && <p className="pt-4 text-muted font-italic">{message}</p>}

          {results.map((blog, i) => {
            return <div key={i}>
              <Link href={`/blogs/${blog.slug}`}>
                <a className="text-primary">{blog.title}</a>
              </Link>
            </div>
          })}
        </div>
      )
  }



  const searchForm = () => (
      <form onSubmit={searchSubmit}>
        <div className="row">
          <div className="col-md-8">
            <input
              type="search"
              className="form-control"
              placeholder="Search Blogs"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <button className="btn btn-block btn-outline-primary">
              Search
            </button>
          </div>
        </div>
      </form>
  )

    return (
      <div className="container-fluid">
        <div className="pt-3 pb-5">
          {searchForm()}
        </div>
        {searched && <div id="searchedBlogs">{searchedBlogs(results)}</div>}
      </div>
    )
}
export default Search
