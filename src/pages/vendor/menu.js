import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { connect } from 'react-redux'

const enhance = compose(
  withRouter,
  connect(({ data }, { match }) => ({
    vendor: data.vendors[match.params.vendorId],
    menuItems: Object.keys(data.menuItems)
      .map(itemId => data.menuItems[itemId])
      .filter(({ vendorId }) => vendorId === match.params.vendorId),
    deals: Object.keys(data.deals)
      .map(itemId => data.deals[itemId])
      .filter(({ vendorId }) => vendorId === match.params.vendorId)
      .map(item => ({
        ...item,
        menuItems: item.menuItemIds.map(itemId => data.menuItems[itemId])
      }))
  }))
)

const Component = ({ children, vendor, menuItems, deals }) => (
  <div>
    Deals:
    {deals.map(item => (
      <div key={item.id}>
        {item.name}{' '}
        <Link to={`/vendor/${vendor.id}/menu/deal/${item.id}/analytics`}>
          Open Analytics
        </Link>
      </div>
    ))}
    Items:
    {menuItems.map(item => (
      <div key={item.id}>
        {item.name}{' '}
        <Link to={`/vendor/${vendor.id}/menu/item/${item.id}/analytics`}>
          Open Analytics
        </Link>
      </div>
    ))}
    {children}
  </div>
)

export default enhance(Component)
