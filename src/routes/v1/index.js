const express = require('express')
const router = express.Router()

// set routes
router.use('/guilds', require('./guilds').router)
router.use('/guild', require('./guild').router)
router.use('/users', require('./users').router)
router.use('/user', require('./user').router)

module.exports.router = router