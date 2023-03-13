const { Router } = require('express')
const router = new Router()
const passport = require('passport')
const Auth = require('../modules/auth/auth')
const fileUpload = require('express-fileupload')

router
    .post('/signin', Auth.SignIn)
    .post('/signin/new_token', Auth.RefreshToken)
    .post('/signup', Auth.SignUp)
    .post('/file/upload', passport.authenticate('jwt', {session: false}), 
    fileUpload({createParentPath: true}), 
    (req, res) => {
        const files = req.files
        console.log(files);

        res.send('ok')
    })
    .get('/file/list', () => {})
    .delete('/file/delete/:id', () => {})
    .get('/file/:id', () => {})
    .get('/file/download/:id', () => {})
    .put('/file/updage/:id', () => {})
    .get('/info', () => {})
    .get('/logout', () => {})

module.exports = router