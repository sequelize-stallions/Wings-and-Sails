import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, withRouter} from 'react-router-dom'
import {Login, Signup, UserHome} from './components'
import {AllProducts} from './components/AllProducts'
import {Cart} from './components/cart'
import {Checkout} from './components/checkout'
import {GuestCart} from './components/guest-cart'
import {Order} from './components/Order'
import {Admin} from './components/Admin'
import {UserForm} from './components/UserForm'
import {ProductForm} from './components/ProductForm'

import {SingleProduct} from './components/SingleProduct'
import {me} from './store'

import Container from '@material-ui/core/Container'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    const {isAdmin} = this.props
    return (
      <Container>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/products" component={AllProducts} />
          <Route path="/products/:id" component={SingleProduct} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/cart" component={Cart} />
          <Route path="/guest-cart" component={GuestCart} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders/:id" component={Order} />
              {isAdmin && (
                <Switch>
                  <Route path="/admin" component={Admin} />
                  <Route path="/user/:id" component={UserForm} />
                  <Route path="/product/:id" component={ProductForm} />
                </Switch>
              )}
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
        </Switch>
      </Container>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
