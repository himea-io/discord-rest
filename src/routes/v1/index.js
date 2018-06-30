const express = require('express')
const router = express.Router()

// routes files
const guilds = require('./guilds')
const guild = require('./guild')
const users = require('./users')
const user = require('./user')

// set routes
router.use('/guilds', guilds.router)
router.use('/guild', guild.router)
router.use('/users', users.router)
router.use('/user', user.router)

module.exports.router = router