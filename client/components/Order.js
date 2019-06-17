import React, {Component} from 'react'
import {connect} from 'react-redux'

class OrderDisconnected extends Component {
  constructor() {
    super()
  }

  render() {
    const {orders, match} = this.props
    const orderId = match.params.id
    const order = orders.find(element => element.id === +orderId)
    console.log(order)

    let total = 0
    order.products.forEach(function(prod) {
      total += prod.price
    })
    console.log(total)
    return (
      <div>
        <h2>Your order from {order.createdAt.slice(0, 10)}:</h2>
        <h3>
          Items:
          <ol>
            {order.products.map(prod => {
              return (
                <li key={prod.id}>
                  {prod.name}
                  <p>
                    Price: ${prod.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </p>
                  <p>Qty: {prod.productCart.quantity}</p>
                </li>
              )
            })}
          </ol>
        </h3>
        <h3>
          Total price of the order # {order.id}: ${' '}
          {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </h3>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  orders: state.cart.orders
})

export const Order = connect(mapStateToProps)(OrderDisconnected)
