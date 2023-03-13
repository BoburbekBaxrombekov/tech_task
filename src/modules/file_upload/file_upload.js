const path = require('path')
const { uploadFile } = require('./model')
 module.exports = {
    UploadFile: async (req, res) => {
        try {
            const files = req.files

            Object.keys(files).forEach(key => {
                const oneFile = files[key]
                const splittedName = (oneFile.name).split('.')
                const filePath = path.join(__dirname, '../../', 'files', files[key].name)
                files[key].mv(filePath, (err) => {
                    if(err) return res.send({status: 'error', message: err}).status(500)
                })
                const uploadResult = uploadFile(splittedName[0], splittedName[1], oneFile.mimetype, oneFile.size)
            })
    
            res.send({ status: "success", message: Object.keys(files).toString() }) 
        } catch (err) {
            console.log(err.message)
        }
    }
}