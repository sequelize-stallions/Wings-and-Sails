import React from 'react'
import {Link} from 'react-router-dom'
import {AllProducts} from './AllProducts'

export const Checkout = () => {
  return (
    <div>
      <h1>Your order has been placed!</h1>
      <h2>Thank you for shopping with Wings and $ails!</h2>
      <Link to="/products">Add something to your collection!</Link>
    </div>
  )
}
