# discord-rest
An easy way to retrieve information through a Discord bot.

## Setup

1. Set your discord bot token in the `.env` file.
2. Type `npm install`
3. Type `npm start`
4. Enjoy your stuff!

## Routes descriptions

| Route                                 | Description											                          | Format |
| ------------------------------------- | ------------------------------------------------------------------------------- | :----: |
| `api/v1/users`                        | Display all the users known by the bot **(users and bots)**.                    | `JSON` |
| `api/v1/users/bot`                    | Display **all the bots** known by the bot.                                      | `JSON` |
| `api/v1/users/user`                   | Display **all the users** known by the bot.                                     | `JSON` |
| `api/v1/user/{id}`                    | Display a user&#39;s **information**.                                           | `JSON` |
| `api/v1/user/{id}/username`           | Display a user&#39;s **username**.                                              | `RAW`  |
| `api/v1/user/{id}/discriminator`      | Display a user&#39;s **discriminator**.                                         | `RAW`  |
| `api/v1/guilds`                       | Display **all the guilds** of the bot.                                          | `JSON` |
| `api/v1/guild/{id}`                   | Display a guild&#39;s **information**.                                          | `JSON` |
| `api/v1/guild/{id}/{user}`            | Display a member of a guild&#39;s **information** (_nickname_, _joinedAt_...)   | `JSON` |
| `api/v1/guild/{id}/{user}/nickname`   | Display a member&#39;s of a guild **nickname**.                                 | `RAW`  |

## Demo

See this in action at : https://himea.io/api/v1/