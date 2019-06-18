import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {thunkGetProducts} from '../store'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import ListSubheader from '@material-ui/core/ListSubheader'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

const useStyles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flexDirection: 'column',
    justify: 'center',

    overflow: 'hidden'
    // alignItems: "center"
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  gridList: {
    width: 1200,
    height: 1000,
    overflowY: 'auto',
    border: 6
  }
}

class AllProductsDisconnect extends Component {
  componentDidMount() {
    const {guestCart} = this.props

    this.props.getProducts()
    localStorage.setItem('guestCart', JSON.stringify(guestCart))
  }
  render() {
    if (this.props.products) {
      return (
        <div style={useStyles.root}>
          <GridList cellHeight={400} style={useStyles.gridList}>
            <GridListTile
              key="Subheader"
              cols={3}
              style={{height: 'auto', justify: 'center'}}
            >
              <ListSubheader component="div" style={{color: 'white'}}>
                All products
              </ListSubheader>
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
