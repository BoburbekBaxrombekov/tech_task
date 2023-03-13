const express = require('express')
const passport = require('passport')
const jwtMiddleware = require('./src/middleware/passport')
const app = express()
const router = require("./src/modules/router")
const cors = require('cors')
const PORT = 8080
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(passport.initialize())
jwtMiddleware(passport)

app.use(router)


app.listen(PORT, console.log(`server is running on port ${PORT}`))