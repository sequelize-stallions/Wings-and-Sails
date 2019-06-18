import React from 'react'
import {Redirect} from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = {
  root: {
    padding: (3, 2)
  }
}

export default function PaperSheet() {
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          This is a sheet of paper.
        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your
          application.
        </Typography>
      </Paper>
    </div>
  )
}

export class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        redirect: true
      })
    }, 3000)
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/home" />
    }

    return (
      <div>
        <Paper style={useStyles.root}>
          <Typography variant="h5" component="h5">
            Your order has been placed!
          </Typography>
          <Typography component="h5">
            Thank you for shopping with Wings and $ails!
          </Typography>
          <Typography component="h5">
            You will be redirecting to home page in 3 seconds
          </Typography>
        </Paper>
      </div>
    )
  }
}
