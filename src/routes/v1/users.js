const express = require('express')
const router = express.Router()
const client = require('../../../app').client
const utils = require('../../utils')

const users = client.users

router.get('/', (request, response) => {
    let json = []
    users.forEach(user => {
        json.push(utils.userInfo(user.id))
    })
    response.json(json)
})
router.get('/bot', (request, response) => {
    let json = []
    users.filter(user => user.bot).forEach(user => {
        json.push(utils.userInfo(user.id))
    })
    response.json(json)
})
router.get('/user', (request, response) => {
    let json = []
    users.filter(user => !user.bot).forEach(user => {
        json.push(utils.userInfo(user.id))
    })
    response.json(json)
})

module.exports.router = router