const { fetch, fetchAll } = require('../../lib/postgres')

const GET_LIST = `
    SELECT
        *
    FROM
        files
`
const NEW_FILE = `
    INSERT INTO 
        files(file_name, format, mime_type, storage) 
    VALUES ($1, $2, $3, $4)
`

const uploadFile = (file_name, format, mime_type, storage) => fetchAll(NEW_FILE, file_name, format, mime_type, storage)

module.exports = {
    uploadFile
}