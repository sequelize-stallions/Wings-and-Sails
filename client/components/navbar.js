import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {clearCart, logout} from '../store'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  }
}))

const Navbar = ({handleClick, isLoggedIn}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Button
            className={classes.menuButton}
            component={Link}
            to="/products"
            variant="contained"
            color="inherit"
          >
            All products
          </Button>

          <Typography variant="h2" className={classes.title}>
            Wings and $ails
          </Typography>

          {/* The navbar will show these links after you log in */}
          {isLoggedIn ? (
            <div>
              <Button
                className={classes.menuButton}
                component={Link}
                to="/home"
                variant="contained"
                color="inherit"
              >
                Home
              </Button>
              <Button
                className={classes.menuButton}
                component={Link}
                to="/cart"
                variant="contained"
                color="inherit"
              >
                Cart
              </Button>
              <Button
                className={classes.menuButton}
                variant="contained"
                color="inherit"
                onClick={handleClick}
                component={Link}
                to="/logout"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Button
                className={classes.menuButton}
                variant="contained"
                color="inherit"
                onClick={handleClick}
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                className={classes.menuButton}
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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(clearCart())
    }
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
