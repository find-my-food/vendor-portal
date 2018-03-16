import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import Vendor from './pages/vendor'

const enhance = compose(
  withRouter,
  connect(({ data }) => ({
    vendors: data.vendors
  }))
)

const Component = ({ vendors }) => (
  <Switch>
    <Route path="/vendor/:vendorId">
      <Vendor />
    </Route>
    <Redirect to={`/vendor/${Object.keys(vendors)[0]}`} />
  </Switch>
)

export default enhance(Component)
