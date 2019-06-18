import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {guestGetCart, guestRemoveProduct} from '../store'

export class GuestCartDisconnected extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const localCart = JSON.parse(localStorage.getItem('guestCart'))
    this.props.getCart(localCart)
  }

  async handleRemove(prodcutId) {
    await this.props.removeProduct(prodcutId)
    localStorage.setItem('guestCart', JSON.stringify(this.props.cart))
  }

  handleClick() {
    const {history} = this.props
    history.push('/signup')
  }

  render() {
    if (!this.props.cart.products.length) {
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
                <td />
                <td />
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
                <th>Price</th>
                <th>Remove</th>
              </tr>
              {this.props.cart.products.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>
                      ${' '}
                      {product.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => this.handleRemove(product.id)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <button type="button" onClick={this.handleClick}>
            Please Sign In or Sign Up to Checkout
          </button>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  cart: state.guestCart
})

const mapDispatchToProps = dispatch => ({
  removeProduct: productId => dispatch(guestRemoveProduct(productId)),
  getCart: cart => dispatch(guestGetCart(cart))
})

export const GuestCart = connect(mapStateToProps, mapDispatchToProps)(
  GuestCartDisconnected
)
