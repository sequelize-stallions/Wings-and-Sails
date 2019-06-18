import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import ListSubheader from '@material-ui/core/ListSubheader'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {thunkGetProducts} from '../store'

const useStyles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  n: {
    color: 'white'
  }
}

class AllProductsDisconnect extends Component {
  componentDidMount() {
    const {guestCart} = this.props

    this.props.getProducts()
    localStorage.setItem('guestCart', JSON.stringify(guestCart))
  }
  render() {
    console.log(useStyles.icon)
    if (this.props.products) {
      return (
        <div className={useStyles.root}>
          <GridList cellHeight={300}>
            <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
              <ListSubheader component="div">All products</ListSubheader>
            </GridListTile>

            {this.props.products.map(product => {
              return (
                <GridListTile key={product.id}>
                  <img src={product.imgUrl} alt={product.name} />
                  <GridListTileBar
                    title={
                      <Link
                        to={`/products/${product.id}`}
                        style={{color: '#FFF'}}
                      >
                        {product.name}
                      </Link>
                    }
                    subtitle={
                      <span>
                        Price: ${' '}
                        {product.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </span>
                    }
                    actionIcon={
                      <IconButton
                        aria-label={`info about ${product.name}`}
                        color="primary"
                        size="medium"
                      >
                        <Link
                          to={`/products/${product.id}`}
                          style={{color: '#FFF'}}
                        >
                          <AddShoppingCartIcon />
                        </Link>
                      </IconButton>
                    }
                  />
                </GridListTile>
              )
            })}
          </GridList>
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

const mapState = state => {
  return {
    products: state.products.products,
    guestCart: state.guestCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(thunkGetProducts())
  }
}

export const AllProducts = connect(mapState, mapDispatchToProps)(
  AllProductsDisconnect
)
