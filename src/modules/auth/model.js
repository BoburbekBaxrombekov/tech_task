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

const registerUser = (login, password) => fetchAll(NEW_USER, login, password)
const findUser = (login) => fetch(FIND_USER, login)
const findUserById = (id) => fetch(FIND_USER_BY_ID, id)

module.exports = {
    registerUser,
    findUser,
    findUserById
}