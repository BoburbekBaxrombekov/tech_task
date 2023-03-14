const { fetch, fetchAll } = require('../../lib/postgres')

const GET_LIST = `
    SELECT
        *
    FROM
        files
    ORDER BY 
        id 
    DESC
        LIMIT $1
        OFFSET $2;
`
const GET_ONE_BY_NAME = `
    SELECT
        *
    FROM
        files
    WHERE
        file_name = $1
`
const GET_ONE_BY_ID = `
    SELECT
        *
    FROM
        files
    WHERE
        id = $1
`
const NEW_FILE = `
    INSERT INTO 
        files(file_name, format, mime_type, storage) 
    VALUES ($1, $2, $3, $4)
`
const DELETE_FILE = `
    DELETE FROM files WHERE id = $1
`
const UPDATE_FILE = `
    UPDATE 
        files 
    SET 
        file_name = $1, 
        format = $2, 
        mime_type = $3, 
        storage = $4 
    WHERE 
        id = $5
`

const uploadFile = (file_name, format, mime_type, storage) => fetchAll(NEW_FILE, file_name, format, mime_type, storage)
const findByName = (file_name) => fetchAll(GET_ONE_BY_NAME, file_name)
const findById = (id) => fetch(GET_ONE_BY_ID, id)
const deleteById = (id) => fetchAll(DELETE_FILE, id)
const updateById = (file_name, format, mime_type, storage, id) => fetchAll(UPDATE_FILE, file_name, format, mime_type, storage, id)
const getByPagination = (limit, page) => {
    if(limit && page){
        return fetchAll(GET_LIST, limit, (page - 1) * limit)
    }else if(limit && !page){
        return fetchAll(GET_LIST, limit, 0)
    }else if(!limit && page){
        return fetchAll(GET_LIST, 10, (page - 1) * 10)
    }else{
        return fetchAll(GET_LIST, 10, 0)
    }
}

module.exports = {
    uploadFile,
    findByName,
    findById,
    getByPagination,
    deleteById,
    updateById
}