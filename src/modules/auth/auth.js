const bcyrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerUser, findUser } = require('./model')
const User = require('../../models/user_model')

const {KEYS} = require('../../config')
 
module.exports = {
    SignIn: async (req, res) => {
        try {
            const { login, password } = req.body
            const candidate = await findUser(login)
            if(candidate){
                //* User exist with this login
                const passwordResult = bcyrpt.compareSync(password, candidate.password)
                if(passwordResult){
                    //* Password is correct
                    const token = jwt.sign({
                        email: candidate.id,
                        user_uuid: candidate.uniq_id
                    }, KEYS.jwt, {expiresIn: 60 * 10})  

                    res.send({
                        token: `Bearer ${token}`
                    }).status(200)
                }else{
                    //* Password is incorrect
                    res.send({
                        message: "Login or password is incorrect"
                    }).status(401)
                }
            }else{
                //* User not exist with this login
                res.send({
                    message: "User not found"
                }).status(404)
            }

        } catch (err) {
            console.log(err.message)
        }
    },
    RefreshToken: async (req, res) => {
        try {
            const { authorization } = req.headers
            const newArr = authorization.split(" ")
            newArr.splice(0, 1)
            const payload = jwt.verify(newArr[0], KEYS.jwt);
            const tokenData = jwt.decode(newArr[0], { complete: true })
            delete payload.iat;
            delete payload.exp;
            if(tokenData.payload.email && tokenData.payload.user_uuid){
                //* If token is correct
                const { email, user_uuid } = tokenData.payload
                const newToken = jwt.sign({
                    email: email,
                    user_uuid: user_uuid
                }, KEYS.jwt, {expiresIn: 60 * 15})
                res.send({
                    token: `Bearer ${newToken}`
                }).status(200)
            }
            
        } catch (err) {
            if((err.message).includes('Unexpected token')){
                //* If token is incorrect
                res.send({
                    message: `Invalid token.`
                }).status(400)
            }else{
                console.log(err.message)
            }
        }
    },
    SignUp: async (req, res) => {
        try {
            const { login, password } = req.body
            const candidate = await findUser(login)
            if(candidate){
                //* User exist Need to send error
                res.status(409).send({
                    message: "This login already exist."
                })
            }else{
                //* Need to create new user
                const salt = bcyrpt.genSaltSync(10)
                const newUser = new User(login, bcyrpt.hashSync(password, salt))
                const createdUser = await registerUser(newUser.id, newUser.password)
                if(createdUser) res.send({id: newUser.id, password: newUser.password}).status(201)
                if(!createdUser) res.status(500).send({message: "Something went wrong!"})
            }
        } catch (err) {
            console.log(err.message)
            res.send({message: "Something went wrong!"}).status(500)
        }
    },
    Info: async (req, res) => {
        try {
            const { authorization } = req.headers
            const newArr = authorization.split(" ")
            newArr.splice(0, 1)
            const tokenData = jwt.decode(newArr[0], { complete: true })
            if(tokenData.payload.user_uuid){
                res.send({id: tokenData.payload.user_uuid})
            }else{
                res.send({message: "Token is invalid"}).status(500)
            }
        } catch (err) {
            console.log(err.message)
            res.send({message: "Something went wrong!"}).status(500)
        }
    },
    LogOut: async (req, res) => {
        try {
            const { authorization } = req.headers
            const newArr = authorization.split(" ")
            newArr.splice(0, 1)
            const tokenData = jwt.decode(newArr[0], { complete: true })
            jwt.sign({email: tokenData.payload.email, user_uuid: tokenData.payload.user_uuid}, KEYS.jwt, { expiresIn: 1 } , (logout, err) => {
            if (logout) {
            res.send({msg : 'You have been Logged Out' });
            } else {
            res.send({msg:'Error'});
            }})
        } catch (err) {
            console.log(err.message)
            res.send({message: "Something went wrong!"}).status(500)
        }
    },
}