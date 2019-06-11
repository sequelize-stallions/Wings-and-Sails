import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
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
                {/* <Link to={`/products/${product.id}`}><h3>{product.name}</h3></Link> */}
                <hr />
                <img
                  src={product.imgUrl}
                  style={{height: 200, width: 200}}
                  alt={product.name}
                />
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
    products: state.allProductsReducer.products
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
