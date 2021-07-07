import React, {Component} from 'react'
import {connect} from 'react-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = {
  root: {
    width: '100%'
  },
  paper: {
    marginTop: 30,
    maxWidth: '80%',
    overflowX: 'auto',
    marginBottom: 3
  },
  table: {
    minWidth: 650
  }
}

class OrderDisconnected extends Component {
  constructor() {
    super()
  }

  render() {
    const {orders, match} = this.props
    const orderId = match.params.id
    const order = orders.find(element => element.id === +orderId)
    let total = 0
    order.products.forEach(function(prod) {
      total += prod.price
    })

    return (
      <div style={useStyles.root}>
        <Paper style={useStyles.paper}>
          <Table style={useStyles.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  Date of your order: {order.createdAt.slice(0, 10)}
                </TableCell>
                <TableCell align="right">Items</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.products.map(prod => (
                <TableRow key={prod.name}>
                  <TableCell component="th" scope="row" />
                  <TableCell align="right">{prod.name}</TableCell>
                  <TableCell align="right">
                    {prod.productCart.quantity}
                  </TableCell>
                  <TableCell align="right">
                    ${prod.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell component="th" scope="row">
                  Total price of the order # {order.id}:
                </TableCell>
                <TableCell align="right"> </TableCell>
                <TableCell align="right"> </TableCell>
                <TableCell align="right">
                  $ {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  orders: state.cart.orders
})

export const Order = connect(mapStateToProps)(OrderDisconnected)
