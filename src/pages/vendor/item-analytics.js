import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import Aside from '../../components/aside'
import Overlay from '../../components/overlay'

const enhance = compose(
  withRouter,
  connect(({ data }, { match }) => ({
    vendor: data.vendors[match.params.vendorId],
    item: {
      deal: () => ({
        ...data.deals[match.params.itemId],
        menuItems: data.deals[match.params.itemId].menuItemIds.map(
          itemId => data.menuItems[itemId]
        )
      }),
      item: () => data.menuItems[match.params.itemId]
    }[match.params.itemType]()
  })),
  withHandlers({
    close: ({ history }) => () => {
      history.goBack()
    }
  })
)

const Component = ({ item, close }) => (
  <React.Fragment>
    <Overlay onClick={close} />
    <Aside>Analytics for {item.name}</Aside>
  </React.Fragment>
)

export default enhance(Component)
