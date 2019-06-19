import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {thunkGetCart, thunkGetOrders, thunkMergeCarts} from '../store'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow)

const useStyles = {
  paper: {
    padding: 10,
    marginBottom: 10,
    fontSize: '25px',
    textAlign: 'center'
  },
  root: {
    width: '70%',
    marginTop: 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
}
/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  async componentDidMount() {
    await this.props.getCart()
    const {cart, guestCart} = this.props
    if (guestCart.products.length) {
      this.props.mergeCarts(guestCart.products, cart.id)
      this.props.getCart()
    }
    localStorage.setItem(
      'guestCart',
      JSON.stringify({
        products: []
      })
    )
    this.props.getOrders()
  }

  render() {
    const {email} = this.props
    if (this.props.orders.length < 1) {
      return (
        <div>
          <h3>Welcome, {email}</h3>
        </div>
      )
    } else {
      return (
        <Paper style={useStyles.root}>
          <Paper style={useStyles.paper}>
            Welcome back, {email}! Your orders:
            <Table style={useStyles.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Order #</StyledTableCell>
                  <StyledTableCell align="center">Date</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.orders.map(order => (
                  <StyledTableRow key={order.id}>
                    <StyledTableCell component="th" scope="row" align="center">
                      {order.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Link to={`/orders/${order.id}`}>
                        {order.updatedAt.slice(0, 10)}
                      </Link>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Paper>
      )
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    orders: state.cart.orders,
    guestCart: state.guestCart,
    cart: state.cart.cart
  }
}

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(thunkGetCart()),
  getOrders: () => dispatch(thunkGetOrders()),
  mergeCarts: (products, cartId) => dispatch(thunkMergeCarts(products, cartId))
})
export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
