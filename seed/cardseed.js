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
  },
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
    name: 'Amber',
    subname: 'Birthday Bunny!',
    rarity: 'UR',
    image: 'https://i.imgur.com/l2kGHr6.jpg',
    category: 'genshin',
    id: 100
  },
  {
    name: 'Amber',
    subname: 'Outrider Amber!',
    rarity: 'SR',
    image: 'https://i.imgur.com/dRq4hew.jpg',
    category: 'genshin',
    id: 101
  },
  {
    name: 'Barbara',
    subname: 'Summertime Sparkle',
    rarity: 'SR',
    image: 'https://i.imgur.com/faquy8F.jpg',
    category: 'genshin',
    id: 102
  },
  {
    name: 'Eula',
    subname: 'Spindrift Knight',
    rarity: 'R',
    image: 'https://i.imgur.com/xoYgsga.jpg',
    category: 'genshin',
    id: 103
  },
  {
    name: 'Fischl',
    subname: 'Flowers for Princess Fischl',
    rarity: 'UR',
    image: 'https://i.imgur.com/4t6LXoy.jpg',
    category: 'genshin',
    id: 104
  },
  {
    name: 'Ganyu',
    subname: 'Lantern Rite Festival',
    rarity: 'SSR',
    image: 'https://i.imgur.com/6OUOdR1.jpg',
    category: 'genshin',
    id: 105
  },
  {
    name: 'Hu Tao',
    subname: 'Welcome to Wangsheng!',
    rarity: 'SR',
    image: 'https://i.imgur.com/fCsjzj9.jpg',
    category: 'genshin',
    id: 106
  },
  {
    name: 'Hu Tao',
    subname: 'Fragrance in Thaw',
    rarity: 'R',
    image: 'https://i.imgur.com/Gf8clQq.jpg',
    category: 'genshin',
    id: 107
  },
  {
    name: 'Jean',
    subname: 'Sea Breeze Dandelion',
    rarity: 'SSR',
    image: 'https://i.imgur.com/5JWIvQx.jpg',
    category: 'genshin',
    id: 108
  },
  {
    name: 'Ayaka',
    subname: 'Frostflake Heron',
    rarity: 'R',
    image: 'https://i.imgur.com/ew9fBqG.jpg',
    category: 'genshin',
    id: 109
  },
  {
    name: 'Keqing',
    subname: 'Driving Thunder',
    rarity: 'R',
    image: 'https://i.imgur.com/AKPSX6Y.jpg',
    category: 'genshin',
    id: 110
  },
  {
    name: 'Keqing',
    subname: 'Starward Sword',
    rarity: 'SR',
    image: 'https://i.imgur.com/Ww2EAN4.jpg',
    category: 'genshin',
    id: 111
  },
  {
    name: 'Keqing',
    subname: 'Moment of Reprise',
    rarity: 'SSR',
    image: 'https://i.imgur.com/1PjUso7.jpg',
    category: 'genshin',
    id: 112
  },
  {
    name: 'Keqing',
    subname: 'Lantern Rite Date',
    rarity: 'SR',
    image: 'https://i.imgur.com/zV5aWJ3.jpg',
    category: 'genshin',
    id: 113
  },
  {
    name: 'Sara',
    subname: 'Vision Hunt',
    rarity: 'SR',
    image: 'https://i.imgur.com/xbBV6kP.jpg',
    category: 'genshin',
    id: 114
  },
  {
    name: 'Mona',
    subname: 'Astral Reflection',
    rarity: 'R',
    image: 'https://i.imgur.com/zrPW65w.jpg',
    category: 'genshin',
    id: 115
  },
  {
    name: 'Sucrose',
    subname: 'Glasses Off',
    rarity: 'SR',
    image: 'https://i.imgur.com/gY3KD5j.jpeg',
    category: 'genshin',
    id: 116
  },
  {
    name: 'Xiangling',
    subname: 'Wanmin Restaurant',
    rarity: 'UR',
    image: 'https://i.imgur.com/7DvEN27.jpg',
    category: 'genshin',
    id: 117
  },
  {
    name: 'Ningguang',
    subname: 'Eclipsing Star',
    rarity: 'R',
    image: 'https://i.imgur.com/bdxKAhV.jpg',
    category: 'genshin',
    id: 118
  },
  {
    name: 'Eula',
    subname: 'Shh...',
    rarity: 'SR',
    image: 'https://i.imgur.com/2akEBcZ.jpg',
    category: 'genshin',
    id: 119
  },
  {
    name: 'Houshou Marine',
    subname: 'Yousoro!',
    rarity: 'R',
    image: 'https://i.imgur.com/0zMvDgC.jpg',
    category: 'hololive',
    id: 7
  },
  {
    name: 'Hu Tao',
    subname: 'Enjoying the City',
    rarity: 'SSR',
    image: 'https://i.imgur.com/ASc6Xc7.jpg',
    category: 'genshin',
    id: 120
  },
  {
    name: 'Hu Tao',
    subname: 'Garden of Eternal Rest',
    rarity: 'UR',
    image: 'https://i.imgur.com/vLhbxMX.jpg',
    category: 'genshin',
    id: 121
  },
  {
    name: 'Natsuiro Matsuri',
    subname: 'Good morning!',
    rarity: 'SSR',
    image: 'https://i.imgur.com/fBVUaHA.jpg',
    category: 'hololive',
    id: 8
  },
  {
    name: 'Nekomata Okayu',
    subname: 'Lazy Gaming Day',
    rarity: 'UR',
    image: 'https://i.imgur.com/JK3bpWg.jpg',
    category: 'hololive',
    id: 9
  },
  {
    name: 'Shiranui Flare',
    subname: 'Smile & Go!',
    rarity: 'SR',
    image: 'https://i.imgur.com/5N2Xhf3.jpg',
    category: 'hololive',
    id: 10
  },
  {
    name: 'Takanashi Kiara',
    subname: 'Kiara Fried Phoenix',
    rarity: 'SSR',
    image: 'https://i.imgur.com/iNAruDQ.jpeg',
    category: 'hololive',
    id: 11
  },
  {
    name: 'Tsunomaki Watame',
    subname: 'Do-do-do!',
    rarity: 'R',
    image: 'https://i.imgur.com/RzHxb8R.jpeg',
    category: 'hololive',
    id: 12
  },
  {
    name: 'Nakiri Ayame',
    subname: '*Take my picture!*',
    rarity: 'UR',
    image: 'https://i.imgur.com/Ag925CF.jpeg',
    category: 'hololive',
    id: 13
  },
  {
    name: 'Yanfei',
    subname: 'Wise Innocence',
    rarity: 'R',
    image: 'https://i.imgur.com/1mobizL.jpeg',
    category: 'genshin',
    id: 122
  },
  {
    name: 'Yoimiya',
    subname: 'Dream-like Twilight',
    rarity: 'UR',
    image: 'https://i.imgur.com/JUiuPdb.jpeg',
    category: 'genshin',
    id: 123
  }
  // 8/30/2021 cut
]
// IMAGES ARE 550 X 700

//TEMPLATE
  var template = {
    name: '',
    subname: '',
    rarity: '',
    image: '',
    category: '',
    id: 0
  }

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