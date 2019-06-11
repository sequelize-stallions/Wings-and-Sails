import axios from 'axios'

const initialProducts = {
  products: [],
  selectedProduct: {}
}

//get all products
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

//get single product
const GET_PRODUCT = 'GET_PRODUCT'

export const getSingleProduct = product => ({
  type: GET_PRODUCT,
  product
})

export const thunkGetSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(getSingleProduct(data))
    } catch (error) {
      console.log('Could not get Single Product', error)
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
    case GET_PRODUCT:
      return {
        ...state,
        selectedProduct: action.product
      }
    default:
      return state
  }
}
