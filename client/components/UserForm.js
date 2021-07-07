import React, {Component} from 'react'
import axios from 'axios'

export class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      email: ''
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
    event.preventDefault()
    try {
      await axios.put(`/api/users/${this.props.match.params.id}`, this.state)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
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
        <button type="submit">Submit</button>
      </form>
    )
  }
}
