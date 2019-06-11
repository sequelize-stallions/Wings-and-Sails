import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {thunkGetProducts} from '../store'

class AllProductsDisconnect extends Component {
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    if (this.props.products) {
      return (
        <div>
          {this.props.products.map(product => {
            return (
              <div key={product.id}>
                <hr />
                <Link to={`/products/${product.id}`}>
                  <h3>{product.name}</h3>
                </Link>
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.imgUrl}
                    style={{height: 200, width: 200}}
                    alt={product.name}
                  />
                </Link>
                <h3>${product.price}</h3>
                <h4>{product.description}</h4>
                <hr />
              </div>
            )
          })}
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

const mapState = state => {
  return {
    products: state.products.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(thunkGetProducts())
  }
}

export const AllProducts = connect(mapState, mapDispatchToProps)(
  AllProductsDisconnect
)
