const {checkToken} = require('../modules/auth/model')

const tokenChecker = async(req, res, next) => {
    const { authorization } = req.headers
    const newArr = authorization.split(" ")
    newArr.splice(0, 1)

    const existToken = await checkToken(newArr[0])
    console.log(existToken);
    if(existToken){
        res.send({status: 'error', message: 'token expired'})
    }
    next()
}

module.exports = tokenChecker