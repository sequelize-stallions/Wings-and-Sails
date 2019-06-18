import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'

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
