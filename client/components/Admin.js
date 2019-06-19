import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const styles = {
  root: {
    width: '100%',
    maxWidth: 360
  },
  paper: {
    width: '100%',
    overflowX: 'auto',
    marginTop: 10
  },
  table: {
    minWidth: 650
  },
  button: {
    width: '100%'
  }
}

export class Admin extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      products: []
    }
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this)
  }
  async componentDidMount() {
    try {
      const {data} = await axios.get('/api/users')
      const results = await axios.get('/api/products')
      this.setState({users: data, products: results.data})
    } catch (err) {
      console.log(err)
    }
  }

  async handleDeleteUser(target) {
    try {
      await axios.delete(`/api/users/${target}`)
      const {data} = await axios.get('/api/users')
      this.setState({users: data})
    } catch (err) {
      console.log(err)
    }
  }

  async handleDeleteProduct(target) {
    await axios.delete(`/api/products/${target}`)
    const {data} = await axios.get('/api/products')
    this.setState({products: data})
  }

  render() {
    if (this.state.users) {
      return (
        <Paper style={styles.paper}>
          <Paper style={styles.paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Users</TableCell>
                  <TableCell align="left"> Name </TableCell>
                  <TableCell align="left">Update</TableCell>
                  <TableCell align="left">Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell />
                    <TableCell align="left" component="th" scope="row">
                      {user.fullName}
                    </TableCell>
                    <TableCell align="left">
                      <Link to={`/user/${user.id}`}>Update information</Link>
                    </TableCell>
                    <TableCell align="left">
                      <button
                        type="button"
                        onClick={() => {
                          this.handleDeleteUser(user.id)
                        }}
                      >
                        Delete user
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Paper style={styles.paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Products</TableCell>
                  <TableCell align="left">Product</TableCell>
                  <TableCell align="left">Update</TableCell>
                  <TableCell align="left">Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.products.map(prod => (
                  <TableRow key={prod.id}>
                    <TableCell />
                    <TableCell align="left" component="th" scope="row">
                      {prod.name}
                    </TableCell>
                    <TableCell align="left">
                      <Link to={`/product/${prod.id}`}>Update information</Link>
                    </TableCell>
                    <TableCell align="left">
                      <button
                        type="button"
                        onClick={() => {
                          this.handleDeleteProduct(prod.id)
                        }}
                      >
                        Delete user
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Paper>
      )
    } else {
      return <h1>Page is loading</h1>
    }
  }
}
