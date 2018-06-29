require('dotenv').config()
const Discord = require('discord.js')
const express = require('express')
const logger = require('morgan')
const router = express.Router()

const app = express()
const client = new Discord.Client()

// send a message on login
client.on('ready', () => console.log(`Discord bot started\n`))

// login to discord else kill app
client.login(process.env.TOKEN)

app.use(logger('dev'))

// all routes prefixed with api/v1
app.use('/api/v1', router)
// using router.get() to prefix our path
router.get('/users', (request, response) => {
  let users = client.users
  let json = []
  users.forEach(user => {
    json.push({
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      bot: user.bot
    })
  })
  response.json(json)
})
router.get('/users/bot', (request, response) => {
  let users = client.users
  let json = []
  users.filter(user => user.bot).forEach(user => {
    json.push({
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      bot: user.bot
    })
  })
  response.json(json)
})
router.get('/users/user', (request, response) => {
  let users = client.users
  let json = []
  users.filter(user => !user.bot).forEach(user => {
    json.push({
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      bot: user.bot
    })
  })
  response.json(json)
})
router.get('/user/:id', (request, response) => {
  let json
  if (/^[0-9]*$/.test(request.params.id)) {
    let user = client.users.get(request.params.id)

    if (user) {
      json = {
        id: user.id,
        username: user.username,
        discriminator: user.discriminator,
        bot: user.bot
      }
    } else json = {
      status: 404,
      message: `User not found : '${request.params.id}'.`
    }
  } else json = {
    status: 400,
    message: `Please use a valid user id.`
  }
  response.json(json)
})
router.get('/user/:id/username', (request, response) => {
  let json
  if (/^[0-9]*$/.test(request.params.id)) {
    let user = client.users.get(request.params.id)

    if (user) {
      response.send(user.username)
      return
    } else json = {
      status: 404,
      message: `User not found : '${request.params.id}'.`
    }
  } else json = {
    status: 400,
    message: `Please use a valid user id.`
  }
  response.json(json)
})
router.get('/user/:id/discriminator', (request, response) => {
  let json
  if (/^[0-9]*$/.test(request.params.id)) {
    let user = client.users.get(request.params.id)

    if (user) {
      response.send(user.discriminator)
      return
    } else json = {
      status: 404,
      message: `User not found : '${request.params.id}'.`
    }
  } else json = {
    status: 400,
    message: `Please use a valid user id.`
  }
  response.json(json)
})
router.get('/guilds', (request, response) => {
  let guilds = client.guilds
  let json = []
  guilds.forEach(guild => {
    json.push({
      id: guild.id,
      name: guild.name,
      members: guild.memberCount,
      owner: guild.ownerID
    })
  })
  response.json(json)
})
router.get('/guild/:id', (request, response) => {
  let json
  if (/^[0-9]*$/.test(request.params.id)) {
    let guild = client.guilds.get(request.params.id)

    if (guild) {
      json = {
        id: guild.id,
        name: guild.name,
        members: guild.memberCount,
        owner: guild.ownerID
      }
    } else json = {
      status: 404,
      message: `Server not found : '${request.params.id}'.`
    }
  } else json = {
    status: 400,
    message: `Please use a valid server id.`
  }
  response.json(json)
})
router.get('/guild/:id/:user', (request, response) => {
  let json
  if (/^[0-9]*$/.test(request.params.id)) {
    let guild = client.guilds.get(request.params.id)
    if (guild) {
      if (/^[0-9]*$/.test(request.params.id)) {
        let user = client.users.get(request.params.user)
        if (user) {
          let _roles = []
          guild.fetchMember(user.id).then(member => {
            member.roles.forEach(role => {
              if (role.name !== '@everyone')
                _roles.push({
                  id: role.id,
                  name: role.name
                })
            })
            json = {
              id: user.id,
              username: user.username,
              nickname: member.nickname,
              discriminator: user.discriminator,
              bot: user.bot,
              roles: _roles
            }
            response.json(json)
          })
        } else {
          json = {
            status: 404,
            message: `User not found : '${request.params.id}'.`
          }
          response.json(json)
        }
      } else {
        json = {
          status: 400,
          message: `Please use a valid user id.`
        }
        response.json(json)
      }
    } else {
      json = {
        status: 404,
        message: `Server not found : '${request.params.id}'.`
      }
      response.json(json)
    }
  } else {
    json = {
      status: 400,
      message: `Please use a valid server id.`
    }
    response.json(json)
  }
})
router.get('/guild/:id/:user', (request, response) => {
  let json
  if (/^[0-9]*$/.test(request.params.id)) {
    let guild = client.guilds.get(request.params.id)
    if (guild) {
      if (/^[0-9]*$/.test(request.params.id)) {
        let user = client.users.get(request.params.user)
        if (user) {
          guild.fetchMember(user.id).then(member => {
            response.send(member.nickname)

          })
        } else {
          json = {
            status: 404,
            message: `User not found : '${request.params.id}'.`
          }
          response.json(json)
        }
      } else {
        json = {
          status: 400,
          message: `Please use a valid user id.`
        }
        response.json(json)
      }
    } else {
      json = {
        status: 404,
        message: `Server not found : '${request.params.id}'.`
      }
      response.json(json)
    }
  } else {
    json = {
      status: 400,
      message: `Please use a valid server id.`
    }
    response.json(json)
  }
})

module.exports = app