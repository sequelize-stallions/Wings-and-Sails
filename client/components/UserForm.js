import React, {Component} from 'react'
import store from '../store'
import {connect} from 'react-redux'
import axios from 'axios'
// import { postingStudent, gettingStudents } from '../reducers'

export class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      password: '',
      admin: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    console.log(this.state)
    event.preventDefault()
    try {
      await axios.put(`/api/users/${this.props.match.params.id}`, this.state)
    } catch (error) {
      console.log(error)
    }
    // try {
    //     await store.dispatch(postingStudent(this.state));
    //     await store.dispatch(gettingStudents())
    // } catch (error) {
    //     console.log(error)
    // }
  }

  render() {
    console.log(this.props.match.params.id)
    return (
      <form id="user-form" onSubmit={this.handleSubmit}>
        <h3>Update a user!</h3>
        <br />
        <label htmlFor="firstName">
          First Name:{' '}
          <span>{this.state.firstName ? '' : 'this field is required!'}</span>
        </label>
        <br />
        <input
          name="firstName"
          type="text"
          onChange={this.handleChange}
          value={this.firstName}
        />
        <br />
        <br />
        <label htmlFor="lastName">
          Last Name:{' '}
          <span>{this.state.lastName ? '' : 'this field is required!'}</span>
        </label>
        <br />
        <input
          name="lastName"
          type="text"
          onChange={this.handleChange}
          value={this.lastName}
        />
        <br />
        <br />
        <label htmlFor="email">
          Email:{' '}
          <span>{this.state.email ? '' : 'this field is required!'}</span>
        </label>
        <br />
        <input
          name="email"
          type="text"
          onChange={this.handleChange}
          value={this.email}
        />
        <br />
        <br />
        <label htmlFor="password">
          Password:{' '}
          <span>{this.state.password ? '' : 'this field is required!'}</span>
        </label>
        <br />
        <input
          name="password"
          type="text"
          onChange={this.handleChange}
          value={this.password}
        />
        <br />
        <br />
        <label htmlFor="address">
          Address:{' '}
          <span>{this.state.address ? '' : 'this field is required!'}</span>
        </label>
        <br />
        <input
          name="address"
          type="text"
          onChange={this.handleChange}
          value={this.address}
        />
        <br />
        <br />
        <label htmlFor="admin">
          Admin:{' '}
          <span>
            {this.state.admin ? '' : 'required, type in true or false!'}
          </span>
        </label>
        <br />
        <input
          name="admin"
          type="text"
          onChange={this.handleChange}
          value={this.admin}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

// const mapStateToProps = (state) => ({
//     students: state.students
// })

// const mapDispatchToProps = (dispatch) => ({
//     postStudent: () => dispatch(postingStudent()),
//     getStudent: () => dispatch(gettingStudents())
// })

// export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
