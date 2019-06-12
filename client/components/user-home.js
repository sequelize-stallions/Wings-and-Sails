import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Axios from 'axios'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  async componentDidMount() {
    try {
      const data = await Axios.post('/api/carts')
      // add to localStore
      console.log(data)
    } catch (error) {
      console.log('ERROR!')
    }
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

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
