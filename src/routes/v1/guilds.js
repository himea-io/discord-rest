const express = require('express');
const router = express.Router();
const client = require('../../../app').client

router.get('/', (request, response) => {
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

module.exports.router = router