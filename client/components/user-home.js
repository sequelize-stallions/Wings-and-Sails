import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {thunkGetCart, thunkGetOrders, thunkMergeCarts} from '../store'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  async componentDidMount() {
    await this.props.getCart()
    const {cart, guestCart} = this.props
    if (guestCart.products.length) {
      this.props.mergeCarts(guestCart.products, cart.id)
      this.props.getCart()
    }
    localStorage.setItem(
      'guestCart',
      JSON.stringify({
        products: []
      })
    )
    this.props.getOrders()
  }

  render() {
    const {email} = this.props
    if (this.props.orders.length < 1) {
      return (
        <div>
          <h3>Welcome, {email}</h3>
        </div>
      )
    } else {
      return (
        <div>
          <h3>Welcome, {email}</h3>
          <h4>Your orders: </h4>
          <ol>
            {this.props.orders.map((order, index) => {
              return (
                <li key={order.id}>
                  <Link to={`/orders/${order.id}`}>
                    Date of order: {order.updatedAt.slice(0, 10)}
                  </Link>
                </li>
              )
            })}
          </ol>
        </div>
      )
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    orders: state.cart.orders,
    guestCart: state.guestCart,
    cart: state.cart.cart
  }
}

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(thunkGetCart()),
  getOrders: () => dispatch(thunkGetOrders()),
  mergeCarts: (products, cartId) => dispatch(thunkMergeCarts(products, cartId))
})
export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
