// Admin page shows all users and products
// Admin can edit information of any user or product

//What is the admin page logic?
//If user is logged in and is an admin,
//render this page on the navbar

//Admin should have an option to create, edit, or delete products
//Creation will be a form
//Deletion will be an 'X' button to delete the product on page.

import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'

//will we need a thunk to get all products and users?
//link to all users and products?

import {thunkGetUsers, me} from '../store'

/**
 * COMPONENT
 */
export class Admin extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      products: []
    }
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this)
  }
  async componentDidMount() {
    // this.props.getUsers()
    // this.props.me()
    const {data} = await axios.get('/api/users')
    const results = await axios.get('/api/products')
    this.setState({users: data, products: results.data})
  }

  async handleDeleteUser(target) {
    await axios.delete(`/api/users/${target}`)
    const {data} = await axios.get('/api/users')
    this.setState({users: data})
  }

  async handleDeleteProduct(target) {
    await axios.delete(`/api/products/${target}`)
    const {data} = await axios.get('/api/products')
    this.setState({products: data})
  }

  render() {
    console.log(this.state, 'does this exist?')
    if (this.state.users) {
      return (
        <div>
          <div>
            <h3>User Info</h3>
            {this.state.users.map(user => {
              return (
                <div key={user.id}>
                  <hr />
                  <Link to={`/user/${user.id}`}>
                    <h3>Update: {user.fullName}</h3>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      this.handleDeleteUser(user.id)
                    }}
                  >
                    {' '}
                    Delete user{' '}
                  </button>
                  <hr />
                </div>
              )
            })}
          </div>
          <br />
          <br />
          <br />
          <div>
            <h3>Product Info</h3>
            {this.state.products.map(product => {
              return (
                <div key={product.id}>
                  <hr />
                  <Link to={`/product/${product.id}`}>
                    <h3>Update: {product.name}</h3>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      this.handleDeleteProduct(product.id)
                    }}
                  >
                    {' '}
                    Delete product{' '}
                  </button>
                  <hr />
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h1>The page is loading...</h1>
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
    users: state.user.users,
    me: state.user.me
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(thunkGetUsers()),
    me: () => dispatch(me())
  }
}
export default connect(mapState, mapDispatchToProps)(Admin)

/**
 * PROP TYPES
 */
Admin.propTypes = {
  users: PropTypes.string
}
