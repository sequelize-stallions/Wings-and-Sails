const initialGuestCart = {
  products: []
}

const GUEST_GET_CART = 'GUEST_GET_CART'
const GUEST_ADD_PRODUCT = 'GUEST_ADD_PRODUCT'
const GUEST_REMOVE_PRODUCT = 'GUEST_REMOVE_PRODUCT'

export const guestGetCart = cart => {
  return {
    type: GUEST_GET_CART,
    cart
  }
}

export const guestAddProduct = product => {
  return {
    type: GUEST_ADD_PRODUCT,
    product
  }
}

export const guestRemoveProduct = productId => {
  return {
    type: GUEST_REMOVE_PRODUCT,
    productId
  }
}

export default function(state = initialGuestCart, action) {
  switch (action.type) {
    case GUEST_GET_CART:
      return {
        ...action.cart
      }
    case GUEST_ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product]
      }
    case GUEST_REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.productId
        )
      }
    default:
      return {
        ...state
      }
  }
}
