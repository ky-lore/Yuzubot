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

router.get('/users/find/:id', (req, res) => {
  User.findOne({ _id: req.params.id })
    .then(data => {
      res.json(data)
    })
})

router.put('/users/find/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router