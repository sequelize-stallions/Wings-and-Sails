import React, {Component} from 'react'
import axios from 'axios'

export class ProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: 0,
      imgUrl: '',
      description: '',
      stock: 0
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
      await axios.put(`/api/products/${this.props.match.params.id}`, this.state)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <form id="product-form" onSubmit={this.handleSubmit}>
        <h3>Update a product!</h3>
        <br />
        <label htmlFor="name">
          Name: <span>{this.state.name ? '' : 'this field is required!'}</span>
        </label>
        <br />
        <input
          name="name"
          type="text"
          onChange={this.handleChange}
          value={this.name}
        />
        <br />
        <br />
        <label htmlFor="price">
          Price:{' '}
          <span>{this.state.price ? '' : 'this must be a valid number!'}</span>
        </label>
        <br />
        <input
          name="price"
          type="text"
          onChange={this.handleChange}
          value={this.price}
        />
        <br />
        <br />
        <label htmlFor="description">
          description:{' '}
          <span>{this.state.description ? '' : 'this field is required!'}</span>
        </label>
        <br />
        <input
          name="description"
          type="text"
          onChange={this.handleChange}
          value={this.description}
        />
        <br />
        <br />
        <label htmlFor="stock">
          stock:{' '}
          <span>{this.state.stock ? '' : 'this field is required!'}</span>
        </label>
        <br />
        <input
          name="stock"
          type="text"
          onChange={this.handleChange}
          value={this.stock}
        />
        <br />
        <br />
        <label htmlFor="imgUrl">
          imgUrl: <span>{this.state.imgUrl ? '' : 'this must be a Url!'}</span>
        </label>
        <br />
        <input
          name="imgUrl"
          type="text"
          onChange={this.handleChange}
          value={this.imgUrl}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    )
  }
}
