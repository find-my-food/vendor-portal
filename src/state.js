let uniqueId = 123456
const state = {}

const Entity = ({ collection }) => {
  state[collection] = {}

  return props => {
    const id = (++uniqueId).toString(36)
    state[collection][id] = { id, ...props }
    return id
  }
}

const User = Entity({ collection: 'users' })
const Vendor = Entity({ collection: 'vendors' })
const MenuItem = Entity({ collection: 'menuItems' })
const Deal = Entity({ collection: 'deals' })
const Order = Entity({ collection: 'orders' })

const JohnDoeId = User({
  name: 'John Doe'
})

const vendorId = Vendor({
  name: 'Joes Taco Place',
  description: 'Joes place sells the best tacos',
  hours: [9, 17],
  location: [43.818719, -111.782793],
  isPremium: false
})

const tacosId = MenuItem({
  vendorId,
  name: 'Tacos',
  price: 5,
  pointsPrice: 20,
  pointsReceived: 3,
  image: `https://images.unsplash.com/photo-1512427691650-15fcce1dc7b1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9385b78d6bbaf37cb18a6fea90b804e2&auto=format&fit=crop&w=2551&q=80`,
  description: 'These are good tacos',
  votes: 6
})

const tacoDealId = Deal({
  vendorId,
  menuItemIds: [tacosId],
  name: 'Tacos for $3',
  price: 3,
  pointsPrice: null,
  pointsReceived: 3
})

Order({
  userId: JohnDoeId,
  vendorId,
  date: 1521219928082,
  // These should be polymorphic
  dealsPurchasedIds: [tacoDealId],
  itemsPurchasedIds: []
})

export default state
