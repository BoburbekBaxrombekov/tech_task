const path = require('path')

const fileExtLimiter = (allowedExtArray) => {
    return (req, res, next) => {
        const files = req.files

        const fileExtensions = []
        Object.keys(files).forEach(key => {
            fileExtensions.push(path.extname(files[key].name))
        })

        const allowed = fileExtensions.every(ext => allowedExtArray.includes(ext))
        if(!allowed){
            const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(',', ', ')
            return res.send({status: 'error', message}).status(422)
        }   
        next()
    }
}

module.exports = fileExtLimiter
