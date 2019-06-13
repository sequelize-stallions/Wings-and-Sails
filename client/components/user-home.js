import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {thunkCheckCart, thunkGetCart} from '../store'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  componentDidMount() {
    this.props.checkCart()
    this.props.getCart()
  }

  render() {
    const {email} = this.props
    return (
      <div>
        <h3>Welcome, {email}</h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

const mapDispatchToProps = dispatch => ({
  checkCart: () => dispatch(thunkCheckCart()),
  getCart: () => dispatch(thunkGetCart())
})
export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
