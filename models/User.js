const { model, Schema } = require('mongoose')

const User = new Schema({
  discordid: {
    type: Number,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  stars: {
    type: Number
  },
  pity: {
    type: Number
  },
  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'Card'
  }],
  hasDaily: {
    type: Boolean,
    default: false
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Card'
  }]
}, { timestamps: true })

module.exports = model('User', User)