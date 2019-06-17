import axios from 'axios'

const initialCart = {
  cart: {},
  orders: []
}

//travis is a huge dick

//get all products
const GET_CART = 'GET_CART'
const CHECK_CART = 'CHECK_CART'
const CREATE_CART = 'CREATE_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const CLEAR_CART = 'CLEAR_CART'
const CHECKOUT_CART = 'CHECKOUT_CART'
const GET_ORDERS = 'GET_ORDERS'

const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

const checkCart = () => {
  return {
    type: CHECK_CART
  }
}

const createCart = () => {
  return {
    type: CREATE_CART
  }
}

const addProduct = () => {
  return {
    type: ADD_PRODUCT
  }
}

const removeProduct = id => {
  return {
    type: REMOVE_PRODUCT,
    id
  }
}

const getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}

const checkoutCart = () => {
  return {
    type: CHECKOUT_CART
  }
}

export const clearCart = () => {
  return {
    type: CLEAR_CART
  }
}

export const thunkGetCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/carts')
      // add to localStore
      dispatch(getCart(data))
    } catch (error) {
      console.log('Can not get your cart!')
    }
  }
}

export const thunkCheckCart = () => {
  return async dispatch => {
    try {
      await axios.post('/api/carts')
      dispatch(checkCart())
    } catch (err) {
      console.log(err)
    }
  }
}

export const thunkCreateCart = () => {
  return async dispatch => {
    try {
      await axios.post('/api/carts')
      dispatch(createCart())
    } catch (error) {
      console.log('Failed to create cart: ', error)
    }
  }
}

export const thunkAddProduct = product => {
  return async dispatch => {
    try {
      await axios.post(`/api/carts/addProd`, product)
      dispatch(addProduct())
    } catch (err) {
      console.log('Failed to add product')
    }
  }
}

export const thunkRemoveProduct = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/carts/removeProd/${id}`)
      dispatch(removeProduct(id))
    } catch (err) {
      console.log('Failed to remove product!')
    }
  }
}

export const thunkCheckoutCart = id => {
  return async dispatch => {
    try {
      await axios.put(`/api/carts/${id}`)
      dispatch(checkoutCart())
    } catch (error) {
      console.log('Failed to Checkout')
    }
  }
}

export const thunkGetOrders = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/carts/orders`)
      dispatch(getOrders(data))
    } catch (err) {
      console.log('Failed to load orders!')
    }
  }
}

export default function(state = initialCart, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.cart
      }
    case CHECK_CART:
      return {
        ...state
      }
    case ADD_PRODUCT:
      return {
        ...state
      }
    case REMOVE_PRODUCT:
      return {
        ...state,
        cart: {
          ...state.cart,
          products: state.cart.products.filter(
            product => product.id !== action.id
          )
        }
      }
    case CLEAR_CART:
      return initialCart
    case CHECKOUT_CART:
      return {...state}
    case CREATE_CART:
      return {...state}
    case GET_ORDERS:
      return {...state, orders: action.orders}
    default:
      return state
  }
}
