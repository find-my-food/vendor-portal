import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import Table from '../../components/table'

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
    <h2>Deals</h2>
    <Table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Price</td>
          <td>Items</td>
          <td>Analytics</td>
        </tr>
      </thead>
      <tbody>
        {deals.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>${item.price}</td>
            <td>
              {item.menuItems.length === 0 ? (
                <div>
                  <em>No Items Listed</em>
                </div>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Price</td>
                    </tr>
                  </thead>
                  <tbody>
                    {item.menuItems.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>${item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </td>
            <td>
              <Link to={`/vendor/${vendor.id}/menu/deal/${item.id}/analytics`}>
                Open Analytics
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <br />
    <h2>Menu</h2>
    <Table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Price</td>
          <td>Analytics</td>
        </tr>
      </thead>
      <tbody>
        {menuItems.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>${item.price}</td>
            <td>
              <Link to={`/vendor/${vendor.id}/menu/item/${item.id}/analytics`}>
                Open Analytics
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    {children}
  </div>
)

export default enhance(Component)
