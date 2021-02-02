const router = require('express').Router()
const { User } = require('../models')

router.post('/users', (req, res) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(err => console.log(err))
})

router.get('/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

module.exports = router