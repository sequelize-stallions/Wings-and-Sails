import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import cart from './cart'
import guestCart from './guestCart'
import products from './products'
import user from './user'

const reducer = combineReducers({user, products, cart, guestCart})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './cart'
export * from './guestCart'
export * from './products'
export * from './user'
