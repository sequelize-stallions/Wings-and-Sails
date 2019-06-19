import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {clearCart, guestGetCart, logout} from '../store'

const useStyles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 10
  },
  title: {
    flexGrow: 1
  }
}

class Navbar extends Component {
  componentDidMount() {
    if (!this.props.isLoggedIn) {
      let localCart = JSON.parse(localStorage.getItem('guestCart'))
      if (!localCart.products) {
        localCart = {
          products: []
        }
      }
      this.props.getLocalCart(localCart)
    }
  }

  render() {
    const classes = useStyles
    const {isAdmin} = this.props
    return (
      <div style={classes.root}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <IconButton
              edge="start"
              style={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Button
              style={classes.menuButton}
              component={Link}
              to="/products"
              variant="contained"
              color="inherit"
            >
              All products
            </Button>
            <Typography variant="h2" style={classes.title}>
              Wings and $ails
            </Typography>
            {/* The navbar will show these links after you log in */}
            {this.props.isLoggedIn ? (
              <div>
                <Button
                  style={classes.menuButton}
                  component={Link}
                  to="/home"
                  variant="contained"
                  color="inherit"
                >
                  Home
                </Button>
                <Button
                  style={classes.menuButton}
                  component={Link}
                  to="/cart"
                  variant="contained"
                  color="inherit"
                >
                  Cart
                </Button>
                <Button
                  style={classes.menuButton}
                  variant="contained"
                  color="inherit"
                  onClick={this.props.handleClick}
                  component={Link}
                  to="/logout"
                >
                  Logout
                </Button>
                {isAdmin ? (
                  <Button
                    style={classes.menuButton}
                    variant="contained"
                    color="inherit"
                    component={Link}
                    to="/admin"
                  >
                    Admin page
                  </Button>
                ) : null}
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Button
                  style={classes.menuButton}
                  component={Link}
                  to="/guest-cart"
                  variant="contained"
                  color="inherit"
                >
                  Cart
                </Button>
                <Button
                  style={classes.menuButton}
                  variant="contained"
                  color="inherit"
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  style={classes.menuButton}
                  variant="contained"
                  color="inherit"
                  component={Link}
                  to="/signup"
                >
                  Sign up
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(clearCart())
    },
    getLocalCart: cart => dispatch(guestGetCart(cart))
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
