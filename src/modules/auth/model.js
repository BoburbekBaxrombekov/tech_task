const { fetch, fetchAll } = require('../../lib/postgres')

const FIND_USER = `
    SELECT
        *
    FROM
        users
    WHERE
        id = $1
`
const FIND_USER_BY_ID = `
    SELECT
        id,
        uniq_id
    FROM
        users
    WHERE
        uniq_id = $1
`
const NEW_USER = `
    INSERT INTO 
        users(id, password) 
    VALUES ($1, $2)
`
const EXPIRE_TOKEN = `
    INSERT INTO 
        expired_tokens(token) 
    VALUES ($1)
`
const CHECK_TOKEN = `
    SELECT
        *
    FROM
        expired_tokens
    WHERE
        token = $1
`

const registerUser = (login, password) => fetchAll(NEW_USER, login, password)
const findUser = (login) => fetch(FIND_USER, login)
const findUserById = (id) => fetch(FIND_USER_BY_ID, id)
const expireToken = (token) => fetch(EXPIRE_TOKEN, token)
const checkToken = (token) => fetch(CHECK_TOKEN, token)

module.exports = {
    registerUser,
    findUser,
    findUserById,
    expireToken,
    checkToken
}