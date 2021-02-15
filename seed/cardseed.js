const { User, Card } = require('../models')
// IMAGES ARE 550 X 700
const cardSeed = [
  {
    name: 'Nakiri Ayame',
    subname: 'Before the Stream',
    rarity: 'UR',
    image: 'https://i.imgur.com/6Ab9XUS.png',
    category: 'hololive',
    id: 1
  },
  {
    name: 'Hoshimachi Suisei',
    subname: 'Sui-chan wa...?',
    rarity: 'SSR',
    image: 'https://i.imgur.com/RRQzA4P.png',
    category: 'hololive',
    id: 2
  },
  {
    name: 'Minato Aqua',
    subname: 'Neko-maid Aqua',
    rarity: 'SR',
    image: 'https://i.imgur.com/LCUXeTi.png',
    category: 'hololive',
    id: 3
  },
  {
    name: 'Shirakami Fubuki',
    subname: 'Kon-kon-kitsune!',
    rarity: 'R',
    image: 'https://i.imgur.com/5u9n9O4.png',
    category: 'hololive',
    id: 4
  },
  {
    name: 'Takanashi Kiara',
    subname: 'KFP new hire!',
    rarity: 'SSR',
    image: 'https://i.imgur.com/RC2ExGp.png',
    category: 'hololive',
    id: 5
  },
  {
    name: ,
    subname: ,
    rarity: ,
    image: ,
    category: ,
    id: 5
  }
]
// IMAGES ARE 550 X 700

require('mongoose').connect('mongodb://localhost/yuzubot_db', {
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