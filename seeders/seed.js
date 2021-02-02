const { User, Card } = require('../models')

const userSeed = [
  {
    discordid: '00000000000011',
    username: 'testuser#0000',
    stars: 100000,
    cards: []
  }
]

// IMAGES ARE 550 X 700
const cardSeed = [
  {
    name: 'Nakiri Ayame',
    subname: 'Before the Stream',
    rarity: 'UR',
    image: 'https://i.imgur.com/6Ab9XUS.png',
    id: 1
  },
  {
    name: 'Hoshimachi Suisei',
    subname: 'Sui-chan wa...?',
    rarity: 'SSR',
    image: 'https://i.imgur.com/RRQzA4P.png',
    id: 2
  },
  {
    name: 'Minato Aqua',
    subname: 'Neko-maid Aqua',
    rarity: 'SR',
    image: 'https://i.imgur.com/LCUXeTi.png',
    id: 3
  },
  {
    name: 'Shirakami Fubuki',
    subname: 'Kon-kon-kitsune!',
    rarity: 'R',
    image: 'https://i.imgur.com/5u9n9O4.png',
    id: 4
  }
]

require('mongoose').connect('mongodb://localhost/momobot_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {

    User.deleteMany({})
      .then(() => User.insertMany(userSeed))
      .then(() => {
        console.log('User records inserted!')
        process.exit()
      })
      .catch(err => console.log(err))

  })
  .catch(err => console.log(err))

require('mongoose').connect('mongodb://localhost/momobot_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {

    Card.deleteMany({})
      .then(() => Card.insertMany(cardSeed))
      .then(() => {
        console.log('Card records inserted!')
        process.exit()
      })
      .catch(err => console.log(err))

  })
  .catch(err => console.log(err))