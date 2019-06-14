import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {thunkCheckCart} from '../store'

export class CheckoutDisconnected extends React.Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    // this.props.checkCart()

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

const mapDispatchToProps = dispatch => ({
  checkCart: () => dispatch(thunkCheckCart())
})

export default connect(null, mapDispatchToProps)(CheckoutDisconnected)
