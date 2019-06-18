// Admin page shows all users and products
// Admin can edit information of any user or product

//What is the admin page logic?
//If user is logged in and is an admin,
//render this page on the navbar

//Admin should have an option to create, edit, or delete products
//Creation will be a form
//Deletion will be an 'X' button to delete the product on page.

import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
//Import the user component into admin
import {UserHome} from './user-home'

//will we need a thunk to get all products and users?
//link to all users and products?

import {thunkGetUsers} from '../store'

/**
 * COMPONENT
 */
export class Admin extends React.Component {
  componentDidMount() {
    // this.props.getUsers()
  }

  render() {
    console.log(this.props.users, 'does this exist?')
    if (this.props.users) {
      return (
        <div>
          {this.props.users.map(user => {
            return (
              <div key={user.id}>
                <hr />
                <Link to={`/users/${user.id}`}>
                  <h3>{user.fullName}</h3>
                </Link>
                <h4>{user.email}</h4>
                <h4>{user.password}</h4>
                <h4>{user.address}</h4>
                <hr />
                <UserHome />
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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    users: state.user.users
  }
}

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(thunkGetUsers())
})
export default connect(mapState, mapDispatchToProps)(Admin)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
