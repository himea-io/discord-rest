const Discord = require('discord.js')
const express = require('express')
const logger = require('morgan')
const cors  = require('cors')
require('dotenv').config()

// setup express -
const app = express()
app.use(cors())
app.use(logger('dev'))

// setup the discord bot -
const client = new Discord.Client()
// trying to login to discord if fails kill the app
client.login(process.env.TOKEN).then(() => {
  // all routes prefixed with api/v1
  app.use('/api/v1', require('./src/routes/v1').router)
}).catch((error) => process.exit(1))
// send a message on login
client.on('ready', () => console.log(`Discord bot started\n`))

module.exports.app = app
module.exports.client = client