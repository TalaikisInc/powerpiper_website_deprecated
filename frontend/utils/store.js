import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

export const Reducer = (state, action) => {
  switch (action.type) {
    case 'ACTION':
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}

export const Store = (initialState) => {
  return createStore(Reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
