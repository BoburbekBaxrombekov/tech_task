const { Router } = require('express')
const passport = require('passport')
const fileUpload = require('express-fileupload')
const router = new Router()
const Auth = require('../modules/auth/auth')
const fileUploadModule = require('../modules/file_upload/file_upload')

const filesPayloadExists = require('../middleware/filesPayloadExist')
const fileExtLimiter = require('../middleware/fileExtLimiter')
const fileSizeLimiter = require('../middleware/fileSizeLimiter')
const tokenChecker = require('../middleware/expiredTokenChecker')

router
    .post('/signin', Auth.SignIn)
    .post('/signin/new_token', 
        Auth.RefreshToken)
    .post('/signup', Auth.SignUp)
    .post('/file/upload',
        passport.authenticate('jwt', { session: false }),
        tokenChecker,
        fileUpload({ createParentPath: true }),
        filesPayloadExists,
        fileExtLimiter(['.png', '.jpg', '.jpeg', '.pdf', '.docx']),
        fileSizeLimiter,
        fileUploadModule.UploadFile
    )
    .get('/file/list/:list_size?/:page?', 
        passport.authenticate('jwt', { session: false }), 
        tokenChecker,
        fileUploadModule.getFileList)
    .delete('/file/delete/:id', 
        passport.authenticate('jwt', { session: false }), 
        tokenChecker,
        fileUploadModule.deleteFile)
    .get('/file/:id', 
        passport.authenticate('jwt', { session: false }), 
        tokenChecker,
        fileUploadModule.getFileById)
    .get('/file/download/:id', 
        passport.authenticate('jwt', { session: false }), 
        tokenChecker,
        fileUploadModule.downloadFile)
    .put('/file/update/:id',
        passport.authenticate('jwt', { session: false }),
        tokenChecker,
        fileUpload({ createParentPath: true }),
        filesPayloadExists,
        fileExtLimiter(['.png', '.jpg', '.jpeg', '.pdf', '.docx']),
        fileSizeLimiter,
        fileUploadModule.updateFile)
    .get('/info', 
        passport.authenticate('jwt', { session: false }), 
        tokenChecker,
        Auth.Info)
    .get('/logout', 
        passport.authenticate('jwt', { session: false }), 
        tokenChecker,
        Auth.LogOut)

module.exports = router