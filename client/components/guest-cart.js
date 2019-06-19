import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {guestGetCart, guestRemoveProduct} from '../store'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import Button from '@material-ui/core/Button'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

const useStyles = {
  root: {
    flexGrow: 1,
    spacing: 4
  },
  paper: {
    padding: 10,
    margin: 'auto',
    maxWidth: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  submit: {
    padding: 5,
    margin: 'auto',
    maxWidth: 200,
    flexGrow: 1,
    spacing: 4,
    justify: 'center'
  }
}
export class GuestCartDisconnected extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const localCart = JSON.parse(localStorage.getItem('guestCart'))
    this.props.getCart(localCart)
  }

  async handleRemove(prodcutId) {
    await this.props.removeProduct(prodcutId)
    localStorage.setItem('guestCart', JSON.stringify(this.props.cart))
  }

  handleClick() {
    const {history} = this.props
    history.push('/signup')
  }

  render() {
    if (!this.props.cart.products.length) {
      return (
        <div>
          <h1>Your cart is currently empty</h1>
          <table>
            <tbody>
              <tr>
                <th />
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <Link to="/products">Your Next Favorite Toy</Link>
                </td>
                <td />
                <td />
                <td>
                  <button type="button">X</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    } else {
      console.log(this.props.cart)
      return (
        <div style={useStyles.root}>
          <Paper style={useStyles.paper}>
            <Paper style={useStyles.paper} style={{fontSize: 30}}>
              <AddShoppingCartIcon /> Your cart:
            </Paper>
            {this.props.cart.products.map(product => {
              return (
                <Grid
                  container
                  spacing={5}
                  style={{margin: 1}}
                  key={product.name}
                >
                  <Grid item>
                    <ButtonBase style={useStyles.image}>
                      <img
                        style={useStyles.img}
                        src={product.imgUrl}
                        alt={product.name}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid
                      item
                      xs
                      container
                      direction="column"
                      spacing={2}
                      style={{border: '2px black'}}
                    >
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Qty: 1
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          style={{cursor: 'pointer'}}
                          onClick={() => this.handleRemove(product.id)}
                        >
                          Remove
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                        ${' '}
                        {product.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )
            })}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={useStyles.submit}
              onClick={this.handleClick}
            >
              Please Sign In or Sign Up to Checkout
            </Button>
          </Paper>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  cart: state.guestCart
})

const mapDispatchToProps = dispatch => ({
  removeProduct: productId => dispatch(guestRemoveProduct(productId)),
  getCart: cart => dispatch(guestGetCart(cart))
})

export const GuestCart = connect(mapStateToProps, mapDispatchToProps)(
  GuestCartDisconnected
)
