const client = require('../../app').client

const regex = /^[0-9]{18}$/

const serverNotFound = (id) => {
    return {
        status: 404,
        message: `Server not found : '${id}'.`
    }
}
const userNotFound = (id) => {
    return {
        status: 404,
        message: `User not found : '${id}'.`
    }
}
const invalidUserId = {
    status: 400,
    message: 'Please use a valid user id. (Only numbers with a length of 18)'
}
const invalidServerId = {
    status: 400,
    message: 'Please use a valid server id. (Only numbers with a length of 18)'
}

const userInfo = (id) => {
    const user = client.users.get(id)
    if (user) {
        return {
            id: user.id,
            username: user.username,
            discriminator: user.discriminator,
            avatar: user.avatarURL,
            bot: user.bot
        }
    } else return userNotFound(id)
}
const guildInfo = (id) => {
    const guild = client.guilds.get(id)
    if (guild) {
        return {
            id: guild.id,
            name: guild.name,
            members: guild.memberCount,
            owner: guild.ownerID
        }
    } else return serverNotFound(id)
}
const memberInfo = (guild, id, callback) => {
    if (client.users.get(id)) {
        let info = userInfo(id)
        let _roles = []
        guild.fetchMember(id).then(member => {
            member.roles.forEach(role => {
                if (role.name !== '@everyone')
                    _roles.push({
                        id: role.id,
                        name: role.name
                    })
            })
            info['nickname'] = member.nickname
            info['roles'] = _roles
            callback(info)
            return info
        })
    } else return userNotFound(id)
}

module.exports.guildInfo = guildInfo
module.exports.memberInfo = memberInfo
module.exports.userInfo = userInfo
module.exports.serverNotFound = serverNotFound
module.exports.userNotFound = userNotFound
module.exports.invalidServerId = invalidServerId
module.exports.invalidUserId = invalidUserId
module.exports.regex = regex