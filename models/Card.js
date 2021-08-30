const { model, Schema } = require('mongoose')

const Card = new Schema({
  name: {
    type: String,
  },
  subname: {
    type: String,
    required: true
  },
  rarity: {
    type: String,
    enum: ['UR', 'SSR', 'SR', 'R'],
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    unique: true
  }
}, { timestamps: true })

module.exports = model('Card', Card)