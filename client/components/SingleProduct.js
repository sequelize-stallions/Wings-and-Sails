import React, {Component} from 'react'
import {connect} from 'react-redux'
import {thunkGetSingleProduct} from '../store'

class SingleProductDisconnect extends Component {
  componentDidMount() {
    const {match, getSingleProduct} = this.props

    getSingleProduct(match.params.id)
  }

  render() {
    const {product} = this.props

    return (
      <div id="singleProduct">
        <h1>{product.name}</h1>
        <img src={product.imgUrl} alt={product.name} />
        <p>{product.description}</p>
        <h3>{product.price}</h3>
        <p>Remaining in Stock: {product.stock}</p>
        <button type="button">Add To Cart</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.products.selectedProduct
})

const mapDispatchToProps = dispatch => ({
  getSingleProduct: id => dispatch(thunkGetSingleProduct(id))
})

export const SingleProduct = connect(mapStateToProps, mapDispatchToProps)(
  SingleProductDisconnect
)
