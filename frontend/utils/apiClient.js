import 'isomorphic-fetch'

const requestHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

const BASE_URL = process.env.BASE_URL

export const getAllPosts = () => {
  const options = {
    method: 'GET',
    headers: requestHeaders,
    credentials: 'include'
  }

  return //fetch(`${BASE_URL}/api/posts`, options)
}

export const getPostById = id => {
  const options = {
    method: 'GET',
    headers: requestHeaders,
    credentials: 'include',
  }

  return //fetch(`${BASE_URL}/api/posts/${id}`, options)
}

export const deleteViewer = () => {
  const options = {
    method: 'DELETE',
    headers: requestHeaders,
    credentials: 'include'
  }

  return //fetch(`${BASE_URL}/api/viewer/delete`, options)
}

export const deletePost = (id) => {
  const options = {
    method: 'DELETE',
    headers: requestHeaders,
    credentials: 'include'
  }

  return //fetch(`${BASE_URL}/api/posts/${id}`, options)
}

export const updatePost = ({ content, title, postId }) => {
  const options = {
    method: 'PUT',
    credentials: 'include',
    headers: requestHeaders,
    body: JSON.stringify({ content, title })
  }

  return //fetch(`${BASE_URL}/api/posts/${postId}`, options)
}

export const savePost = ({ content, title }) => {
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: requestHeaders,
    body: JSON.stringify({ content, title })
  }

  return //fetch(`${BASE_URL}/api/posts`, options)
}

export const getAllUsers = () => {
  const options = {
    method: 'GET',
    headers: requestHeaders,
    credentials: 'include'
  }

  return //fetch(`${BASE_URL}/api/1.0/users`, options)
}

export const getUser = (id) => {
  const options = {
    method: 'GET',
    headers: requestHeaders,
    credentials: 'include'
  }

  return //fetch(`${BASE_URL}/api/1.0/users/${id}`, options)
}

export const login = ({ email, password }) => {
  const options = {
    method: 'POST',
    headers: requestHeaders,
    credentials: 'include',
    body: JSON.stringify({ email: email.toLowerCase(), password })
  }

  return fetch(`${BASE_URL}/api/login`, options)
}

export const logout = () => {
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: requestHeaders
  }

  return //fetch(`${BASE_URL}/api/logout`, options)
}

export const signup = ({ email, password, verify }) => {
  const options = {
    method: 'POST',
    headers: requestHeaders,
    credentials: 'include',
    body: JSON.stringify({
      email: email.toLowerCase(),
      password,
      verify
    })
  }

  return //fetch(`${BASE_URL}/api/signup`, options)
}

/* @TODO flat pages */