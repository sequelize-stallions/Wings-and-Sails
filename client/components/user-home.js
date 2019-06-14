import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {thunkCheckCart, thunkGetCart, thunkGetOrders} from '../store'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  componentDidMount() {
    // this.props.checkCart()
    this.props.getCart()
    this.props.getOrders()
  }

  render() {
    const {email} = this.props
    if (!this.props.orders) {
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
    orders: state.cart.orders
  }
}

const mapDispatchToProps = dispatch => ({
  checkCart: () => dispatch(thunkCheckCart()),
  getCart: () => dispatch(thunkGetCart()),
  getOrders: () => dispatch(thunkGetOrders())
})
export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
