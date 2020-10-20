import fetch from 'isomorphic-fetch'
import { API } from '../config'


export const emailContactForm = (data) => {
  let contactEndpoint;

  if (data.authorEmail) {
    contactEndpoint = `${API}/contact-blog-author`
  } else{
    contactEndpoint = `${API}/contact`
  }
  return fetch(`${contactEndpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}
