const router = require('express').Router()
const { Card } = require('../models')

router.get('/Cards', (req, res) => {
  Card.find()
    .then(cards => res.json(cards))
    .catch(err => console.log(err))
})

router.get('/Cards/category/:category', (req, res) => {
  Card.find({ 'category': req.params.category })
    .then(item => res.json(item))
    .catch(err => console.log(err))
})

router.get('/Cards/id/:id', (req, res) => {
  Card.findById(req.params.id)
    .then(card => res.json(card))
    .catch(err => console.log(err))
})

module.exports = router