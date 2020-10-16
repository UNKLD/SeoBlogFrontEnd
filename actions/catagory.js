import fetch from 'isomorphic-fetch'
import { API } from '../config'

export const create = (catagory, token) => {
  return fetch(`${API}/catagory`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(catagory)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const getCatagories = () => {
  return fetch(`${API}/catagories`, {
    method: 'GET',
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const singleCatagory = (slug) => {
  return fetch(`${API}/catagory/${slug}`, {
    method: 'GET',
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const removeCatagory = (slug, token) => {
  return fetch(`${API}/catagory/${slug}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}
