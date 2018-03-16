import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'

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
          menuItems: item.itemsPurchasedIds.map(
            itemId => data.menuItems[itemId]
          ),
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
    <h2>{vendor.name}</h2>
    {Object.entries(orders).map(([key, order]) => (
      <div key={key} style={{ border: '1px solid #ccc', padding: '10px' }}>
        User: {order.user.name}
        <br />
        <br />
        Deals:
        {order.dealItems.map(item => (
          <div key={item.id}>
            <strong>${item.price}</strong> {item.name}
          </div>
        ))}
        {order.dealItems.length === 0 && (
          <div>
            <em>No Deals Purchased</em>
          </div>
        )}
        <br />
        Items:
        {order.menuItems.map(item => (
          <div key={item.id}>
            <strong>${item.price}</strong> {item.name}
          </div>
        ))}
        {order.menuItems.length === 0 && (
          <div>
            <em>No Menu Items Purchased</em>
          </div>
        )}
        <br />
        <br />
        Total: ${order.price}
      </div>
    ))}
  </div>
)

export default enhance(Component)
