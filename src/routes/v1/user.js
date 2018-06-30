const express = require('express')
const router = express.Router()
const client = require('../../../app').client
const utils = require('../../utils')
const regex = utils.regex

const error400 = {
    status: 400,
    message: 'Please use a valid user id. (Only numbers with a length of 18)'
}

// /api/v1/user/##################
router.get('/:id', (request, response) => {
    const id = request.params.id
    if (regex.test(id)) response.json(utils.userInfo(id))
    else response.json(error400)
})

// /api/v1/user/##################/#### (based on utils.userInfo keys)
router.get('/:id/:parameter', (request, response) => {
    const id = request.params.id
    const parameter = request.params.parameter.toLowerCase()
    if (regex.test(id)) {
        const user = utils.userInfo(id)
        if (parameter !== 'id' && (parameter in user)) {
            response.send(user[parameter])
        } else response.json({
            status: 400,
            message: 'Please set a valid parameter.'
        })
    } else response.json(error400)
})

module.exports.router = router