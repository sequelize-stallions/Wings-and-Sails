import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {thunkGetCart} from '../store'

export class CartDisconnected extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getCart()
  }

  render() {
    if (!this.props.cart.id) {
      return (
        <div>
          <h1>Your cart is currently empty</h1>
          <table>
            <tbody>
              <tr>
                <th />
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <Link to="/products">Your Next Favorite Toy</Link>
                </td>
                <td>5</td>
                <td>5000000</td>
                <td>
                  <button type="button">X</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Your cart: </h1>
          <table>
            <tbody>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
              {this.props.cart.products.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.productCart.quantity}</td>
                    <td>
                      ${' '}
                      {product.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </td>
                    <td>
                      <button type="button">X</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  cart: state.cart.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(thunkGetCart())
})

export const Cart = connect(mapStateToProps, mapDispatchToProps)(
  CartDisconnected
)
