import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import Main from '../../components/main'
import Content from '../../components/content'
import Nav, { NavLink } from '../../components/nav'

import OrdersPage from './orders'
import MenuPage from './menu'
import AnalyticsPage from './analytics'
import ItemAnalyticsPage from './item-analytics'

const enhance = compose(
  withRouter,
  connect(({ data }, { match }) => ({
    vendor: data.vendors[match.params.vendorId]
  }))
)

const Component = ({ vendor, children }) => (
  <React.Fragment>
    <Main>
      <Nav>
        <NavLink to={`/vendor/${vendor.id}/orders`}>Orders</NavLink>
        <NavLink to={`/vendor/${vendor.id}/menu`}>Menu and Deals</NavLink>
        <NavLink to={`/vendor/${vendor.id}/analytics`}>Analytics</NavLink>
      </Nav>
      <Content>
        <Switch>
          <Route path={`/vendor/:vendorId/orders`}>
            <OrdersPage />
          </Route>
          <Route path={`/vendor/:vendorId/menu`}>
            <MenuPage>
              <Route
                path={`/vendor/:vendorId/menu/:itemType/:itemId/analytics`}
                component={ItemAnalyticsPage}
              />
            </MenuPage>
          </Route>
          <Route path={`/vendor/:vendorId/analytics`}>
            <AnalyticsPage />
          </Route>
          <Redirect to={`/vendor/${vendor.id}/orders`} />
        </Switch>
      </Content>
    </Main>
    {children}
  </React.Fragment>
)

export default enhance(Component)
