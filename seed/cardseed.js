const { User, Card } = require('../models')
// IMAGES ARE 550 X 700
const cardSeed = [
  {
    name: 'Nekomata Okayu',
    subname: 'Mogu-mogu Okayu!',
    rarity: 'R',
    image: 'https://i.imgur.com/a45ADSM.png',
    category: 'hololive',
    id: 6
  }
]
// IMAGES ARE 550 X 700

require('mongoose').connect('mongodb://localhost/yuzubot_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    Card.insertMany(cardSeed)
    .then(() => {
      console.log('Card records inserted!')
      process.exit()
    })
    .catch(err => console.log(err))
  })
  .catch (err => console.log(err))