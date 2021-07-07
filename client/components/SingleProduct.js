import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {guestAddProduct, thunkAddProduct, thunkGetSingleProduct} from '../store'

class SingleProductDisconnect extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const {match, getSingleProduct} = this.props
    getSingleProduct(match.params.id)
  }

  async handleClick() {
    const {isLoggedIn, product, cart} = this.props

    if (isLoggedIn) {
      const productInstance = {
        productId: product.id,
        cartId: cart.id,
        price: product.price
      }
      this.props.addProduct(productInstance)
    } else {
      await this.props.guestAddProduct(product)
      localStorage.setItem('guestCart', JSON.stringify(this.props.guestCart))
    }
  }

  render() {
    const {product} = this.props

    return product.name ? (
      <div id="singleProduct">
        <Card
          style={{
            width: '50%',
            alignItems: 'center',
            border: 1
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              alt={product.name}
              height="auto"
              image={product.imgUrl}
              title={product.name}
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {product.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {product.description}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                Price: ${' '}
                {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Typography>
              <CardActions>
                <AddShoppingCartIcon onClick={this.handleClick} />
              </CardActions>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    ) : (
      <p>Page Loading</p>
    )
  }
}

const mapStateToProps = state => ({
  product: state.products.selectedProduct,
  cart: state.cart.cart,
  isLoggedIn: !!state.user.id,
  guestCart: state.guestCart
})

const mapDispatchToProps = dispatch => ({
  getSingleProduct: id => dispatch(thunkGetSingleProduct(id)),
  addProduct: product => dispatch(thunkAddProduct(product)),
  guestAddProduct: product => dispatch(guestAddProduct(product))
})

export const SingleProduct = connect(mapStateToProps, mapDispatchToProps)(
  SingleProductDisconnect
)
