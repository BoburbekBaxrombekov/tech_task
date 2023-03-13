const path = require('path')

 module.exports = {
    UploadFile: async (req, res) => {
        try {
            const files = req.files

            Object.keys(files).forEach(key => {
                const filePath = path.join(__dirname, 'files', files[key].name)
                files[key].mv(filePath, (err) => {
                    if(err) return res.send({status: 'error', message: err}).status(500)
                })
            })
    
            res.send({ status: "success", message: Object.keys(files).toString() }) 
        } catch (err) {
            console.log(err.message)
        }
    }
}