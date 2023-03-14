const path = require('path')
const fs = require('fs')
const { uploadFile, findByName, getByPagination, findById, deleteById, updateById } = require('./model')
module.exports = {
    UploadFile: async (req, res) => {
        try {
            const files = req.files

            Object.keys(files).forEach(async (key) => {
                const oneFile = files[key]
                const splittedName = (oneFile.name).split('.')
                const foundFile = await findByName(splittedName[0])
                if (!foundFile.length) {
                    const filePath = path.join(__dirname, '../../', 'files', files[key].name)
                    files[key].mv(filePath, (err) => {
                        if (err) return res.send({ status: 'error', message: err }).status(500)
                    })
                    await uploadFile(splittedName[0], splittedName[1], oneFile.mimetype, oneFile.size)
                    res.send({ status: "success", message: Object.keys(files).toString() })
                } else {
                    res.send({ status: 'error', message: "Image already exist" }).status(500)
                }
            })
        } catch (err) {
            console.log(err.message)
        }
    },
    getFileList: async (req, res) => {
        try {
            const { list_size, page } = req.params
            const getList = await getByPagination(list_size, page)
            res.send(getList)
        } catch (err) {
            console.log(err.message)
        }
    },
    deleteFile: async (req, res) => {
        try {
            const { id } = req.params
            const foundItem = await findById(id)
            if (foundItem) {
                await deleteById(id)
                fs.unlinkSync(path.join(__dirname, '../../', 'files', `${foundItem.file_name}.${foundItem.format}`))
                res.send({ status: 'success', message: 'Successfully deleted' }).status(200)
            } else {
                res.send({ status: 'error', message: 'File with entered id is not founded' }).status(400)
            }
        } catch (err) {
            console.log(err.message)
        }
    },
    getFileById: async (req, res) => {
        try {
            const { id } = req.params
            const foundItem = await findById(id)
            if (foundItem) {
                res.send(foundItem)
            } else {
                res.send({ status: 'error', message: 'File with entered id is not founded' }).status(400)
            }
        } catch (err) {
            console.log(err.message)
        }
    },
    downloadFile: async (req, res) => {
        try {
            const { id } = req.params
            const foundItem = await findById(id)
            if (foundItem) {
                const url = path.join(__dirname, '../../', 'files', `${foundItem.file_name}.${foundItem.format}`)
                res.download(url)
            } else {
                res.send({ status: 'error', message: 'File with entered id is not founded' }).status(400)
            }
        } catch (err) {
            console.log(err.message)
        }
    },
    updateFile: async (req, res) => {
        try {
            const { id } = req.params
            const files = req.files
            const foundFile = await findById(id)
            console.log(files, foundFile);
            if (foundFile && files) {
                fs.unlinkSync(path.join(__dirname, '../../', 'files', `${foundFile.file_name}.${foundFile.format}`))

                Object.keys(files).forEach(async (key) => {
                    const oneFile = files[key]
                    const splittedName = (oneFile.name).split('.')
                    const filePath = path.join(__dirname, '../../', 'files', files[key].name)
                    files[key].mv(filePath, (err) => {
                        if (err) return res.send({ status: 'error', message: err }).status(500)
                    })
                    await updateById(splittedName[0], splittedName[1], oneFile.mimetype, oneFile.size, id)
                    res.send({ status: "success", message: Object.keys(files).toString() })
                })
            }else{
                res.send({ status: 'error', message: 'File with entered id is not founded' }).status(400)
            }

        } catch (err) {
            console.log(err.message)
        }
    },
}