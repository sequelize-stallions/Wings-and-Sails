import React, {Component} from 'react'
import {} from '../reducers'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

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
                  src={product.imageUrl}
                  style={{height: 360, width: 460}}
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
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(thunkGetProducts())
  }
}

export default connect(mapState, mapDispatchToProps)(AllProductsDisconnect)
