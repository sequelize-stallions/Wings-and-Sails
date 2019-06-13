import React, {Component} from 'react'
import {connect} from 'react-redux'
import {thunkAddProduct, thunkGetSingleProduct} from '../store'

class SingleProductDisconnect extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const {match, getSingleProduct} = this.props

    getSingleProduct(match.params.id)
  }

  handleClick() {
    console.log(this.props.cart.id)

    const product = {
      productId: this.props.product.id,
      cartId: this.props.cart.id,
      price: this.props.product.price
    }

    this.props.addProduct(product)
  }

  render() {
    const {product} = this.props

    return product.name ? (
      <div id="singleProduct">
        <h1>{product.name}</h1>
        <img src={product.imgUrl} alt={product.name} />
        <p>{product.description}</p>
        <h3>{`$${product.price
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</h3>
        <p>Remaining in Stock: {product.stock}</p>
        <button type="button" onClick={this.handleClick}>
          Add To Cart
        </button>
      </div>
    ) : (
      <p>Page Loading</p>
    )
  }
}

const mapStateToProps = state => ({
  product: state.products.selectedProduct,
  cart: state.cart.cart
})

const mapDispatchToProps = dispatch => ({
  getSingleProduct: id => dispatch(thunkGetSingleProduct(id)),
  addProduct: product => dispatch(thunkAddProduct(product))
})

export const SingleProduct = connect(mapStateToProps, mapDispatchToProps)(
  SingleProductDisconnect
)
