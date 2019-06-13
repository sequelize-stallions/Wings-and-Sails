import axios from 'axios'

const initialCart = {
  cart: {}
}

//get all products
const GET_CART = 'GET_CART'
const CHECK_CART = 'CHECK_CART'

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
    default:
      return state
  }
}
