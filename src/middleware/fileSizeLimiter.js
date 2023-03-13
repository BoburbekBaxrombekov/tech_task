const MB = 5
const FILE_SIZE_LIMIT = MB * 1024 * 1024

const fileSizeLimiter = (req, res, next) => {
    const files = req.files

    const filesOverLimit = [] 
    Object.keys(files).forEach(key => {
        if(files[key].size > FILE_SIZE_LIMIT){
            filesOverLimit.push(files[key].name)
        }
    })

    if(filesOverLimit.length){
        const properVerb = filesOverLimit > 1 ? "are" : 'is'
        const sentence = `Upload failded. ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MB.`.replaceAll(',', ", ")

        const message = filesOverLimit.length > 3
            ? sentence.replace(',', ' and')
            : sentence.replace(/,(?=[^,]*$)/, ' and')

        res.send({status: 'error', message}).status(400)
    }

    next()
}

module.exports = fileSizeLimiter