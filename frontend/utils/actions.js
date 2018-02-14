import { login, signup, deleteViewer } from './apiClient'

const exception = error => {
  throw new Error(error)
}

const redirect = route => {
  window.location.href = route
}

export const updateStoreKeys = data => {
  return {
    type: 'UPDATE_STORE_KEYS',
    data
  }
}

export const viewerAuthenticated = viewer => {
  return {
    type: 'VIEWER_AUTHENTICATED',
    isAuthenticated: true,
    viewer
  }
}

export const viewerLogout = () => {
  return {
    type: 'VIEWER_LOGOUT'
  }
}

export const viewerDelete = () => {
  return async dispatch => {
    const response = await deleteViewer()

    if (response.status !== 200) {
      return exception('error')
    }

    return dispatch(requestLogout())
  }
}

export const requestDeletePost = id => {
  return async dispatch => {
    const response = await HTTP.deletePost(id)

    if (response.status !== 200) {
      return exception('error')
    }

    window.location.reload()
  }
}

export const requestUpdatePost = data => {
  return async dispatch => {
    const response = await HTTP.updatePost(data)

    if (response.status !== 200) {
      return exception('error')
    }

    window.location.reload()
  }
}

export const requestSavePost = data => {
  return async dispatch => {
    const response = await HTTP.savePost(data)

    if (response.status === 200) {
      return redirect('/')
    }

    if (response.status === 403) {
      return dispatch(requestLogout())
    }

    return exception('error')
  }
}

export const requestLogout = () => {
  return async dispatch => {
    const response = await HTTP.logout()

    if (response.status === 200) {
      return redirect('/')
    }

    if (response.status === 403) {
      return redirect('/')
    }

    return exception('error')
  };
};

export const requestSignin = data => {
  return async dispatch => {
    const response = await login(data)

    if (response.status !== 200) {
      return exception('error')
    }

    return redirect('/')
  }
}

export const requestSignup = data => {
  return async dispatch => {
    const response = await signup(data)

    if (response.status !== 200) {
      return exception('error')
    }

    return redirect('/')
  }
}
