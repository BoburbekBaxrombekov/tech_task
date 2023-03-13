const filesPayloadExist = ( req, res, next ) => {
    if(!req.files) res.send({message: "Missing files"}).status(400)
    next()
}

module.exports = filesPayloadExist