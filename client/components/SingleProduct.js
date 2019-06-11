import React, {Component} from 'react'
import {} from '../reducers'

class SingleProductDisconnect extends Component {
  render() {
    return (
      <div>
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
