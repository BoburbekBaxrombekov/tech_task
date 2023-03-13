const { Router } = require('express')
const passport = require('passport')
const fileUpload = require('express-fileupload')
const router = new Router()
const Auth = require('../modules/auth/auth')
const fileUploadModule = require('../modules/file_upload/file_upload')

const filesPayloadExists = require('../middleware/filesPayloadExist')
const fileExtLimiter = require('../middleware/fileExtLimiter')
const fileSizeLimiter = require('../middleware/fileSizeLimiter')

router
    .post('/signin', Auth.SignIn)
    .post('/signin/new_token', Auth.RefreshToken)
    .post('/signup', Auth.SignUp)
    // .post('/file/upload', passport.authenticate('jwt', {session: false}), 
    // fileUpload({createParentPath: true}),
    // filesPayloadExists,
    // fileExtLimiter(['.png', '.jpg', '.jpeg', '.pdf', '.docx']),
    // fileSizeLimiter, 
    // fileUploadModule.UploadFile
    // )
    .post('/file/upload', 
    fileUpload({createParentPath: true}),
    filesPayloadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg', '.pdf', '.docx']),
    fileSizeLimiter, 
    fileUploadModule.UploadFile
    )
    .get('/file/list/:list_size?/:page?', fileUploadModule.getFileList)
    .delete('/file/delete/:id', fileUploadModule.deleteFile)
    .get('/file/:id', fileUploadModule.getFileById)
    .get('/file/download/:id', () => {})
    .put('/file/updage/:id', () => {})
    .get('/info', () => {})
    .get('/logout', () => {})

module.exports = router