const express = require('express');
const router = express.Router();
const client = require('../../../app').client
const utils = require('../../utils')
const regex = utils.regex

// /api/v1/guild/##################
router.get('/:id', (request, response) => {
    const id = request.params.id
    if (regex.test(id)) response.json(utils.guildInfo(id))
    else response.json(utils.invalidServerId)
})

// /api/v1/guild/##################/####
router.get('/:id/:parameter', (request, response) => {
    const id = request.params.id
    const parameter = request.params.parameter

    if (regex.test(id)) {
        let guild = client.guilds.get(id)
        if (guild) {
            if (regex.test(parameter)) {
                utils.memberInfo(guild, parameter, (info) => response.json(info))
            } else {
                guild = utils.guildInfo(id)
                if (parameter !== 'id' && !regex.test(parameter) && guild[parameter]) {
                    response.send(guild[parameter])
                } else response.json({
                    status: 400,
                    message: 'Please set a valid parameter.'
                })
            }
        } else response.json(utils.serverNotFound(id))
    } else response.json(utils.invalidServerId)
})

// /api/v1/guild/##################/##################/####
router.get('/:id/:user/:parameter', (request, response) => {
    const id = request.params.id
    const userId = request.params.user
    const parameter = request.params.parameter

    if (regex.test(id)) {
        let guild = client.guilds.get(id)
        if (guild) {
            if (regex.test(userId)) {
                utils.memberInfo(guild, userId, (info) => {
                    if (parameter !== 'id' && (parameter in info)) {
                        response.json(info[parameter])
                    } else response.json({
                        status: 400,
                        message: 'Please set a valid parameter.'
                    })
                })
            } else response.json(utils.invalidUserId)
        } else response.json(utils.serverNotFound(id))
    } else response.json(utils.invalidServerId)

})


module.exports.router = router