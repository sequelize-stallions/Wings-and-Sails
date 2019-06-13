import React from 'react'
import {Link, Redirect} from 'react-router-dom'

export class Checkout extends React.Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        redirect: true
      })
    }, 4000)
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/home" />
    }

    return (
      <div>
        <h1>Your order has been placed!</h1>
        <h2>Thank you for shopping with Wings and $ails!</h2>
        <h2>You will be redirecting to home page in 4 seconds</h2>
      </div>
    )
  }
}
