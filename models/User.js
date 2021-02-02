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
  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
}, { timestamps: true })

module.exports = model('User', User)