import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'

import Table from '../../components/table'
import Button from '../../components/button'

const enhance = compose(
  withRouter,
  connect(({ data }, { match }) => ({
    vendor: data.vendors[match.params.vendorId],
    orders: Object.entries(data.orders)
      .filter(([_, order]) => order.vendorId === match.params.vendorId)
      .map(([key, item]) => [
        key,
        {
          ...item,
          user: data.users[item.userId],
          menuItems: [
            ...item.itemsPurchasedIds.map(itemId => data.menuItems[itemId]),
            ...item.dealsPurchasedIds
              .map(itemId => data.deals[itemId])
              .map(item =>
                item.menuItemIds.map(itemId => data.menuItems[itemId])
              )
              .reduce((a, b) => a.concat(b), [])
          ],
          dealItems: item.dealsPurchasedIds
            .map(itemId => data.deals[itemId])
            .map(item => ({
              ...item,
              menuItems: item.menuItemIds.map(itemId => data.menuItems[itemId])
            }))
        }
      ])
      .reduce((obj, [key, item]) => Object.assign(obj, { [key]: item }), {})
  })),
  withProps(({ orders }) => ({
    orders: Object.entries(orders)
      .map(([key, order]) => [
        key,
        {
          ...order,
          price: [...order.menuItems, ...order.dealItems]
            .map(x => x.price)
            .reduce((a, b) => a + b, 0)
        }
      ])
      .reduce((obj, [key, item]) => Object.assign(obj, { [key]: item }), {})
  }))
)

const Component = ({ vendor, orders }) => (
  <div>
    <h2>Orders</h2>
    <Table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Items</td>
          <td>Price</td>
          <td />
        </tr>
      </thead>
      <tbody>
        {Object.entries(orders).map(([key, order]) => (
          <tr key={key} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <td>{order.user.name}</td>
            <td>
              {order.menuItems.length === 0 ? (
                <div>
                  <em>No Menu Items Purchased</em>
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
                    {order.menuItems.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>${item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </td>
            <td>Total: ${order.price}</td>
            <td>
              <Button>Complete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)

export default enhance(Component)
