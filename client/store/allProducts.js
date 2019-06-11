import axios from 'axios'
import thunk from 'redux-thunk'

const initialProducts = {
  products: []
}

const GET_PRODUCTS = 'GET_PRODUCTS'

const getAllProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

export const thunkGetProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
    } catch (err) {
      console.log('Thunk get products!', err)
    }
  }
}

export default function(state = initialProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products
      }
    default:
      return state
  }
}
