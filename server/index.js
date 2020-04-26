const express = require('express')
const steam = require('steam-login')
const path = require('path'); 
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local')})
const cors = require('cors')
const app = express()
const server = process.env.server
const client = process.env.client
const user = require('./routes/user')
const steamRouter = require('./routes/steam')
var bodyParser = require('body-parser')


require('./mongoDB').connectDB(() => {}).then(() => {
  app.use(cors({credentials: true, origin: client}))
  app.use(bodyParser.json())
  app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'a secret' }))
  if(process.env.enviroment!=='prod') {
    app.use(steam.middleware({
      realm: server,
      verify: server + '/auth/steam/callback',
      apiKey: process.env.STEAM_KEY}
    ))

    app.use('/user', steam.enforceLogin('/'), user)
    app.use('/steam', steam.enforceLogin('/'), steamRouter)

    app.get('/', function (req, res) {
      req.user
        ? res.redirect(client + `/steam-login-success/?user=${JSON.stringify(req.user)}` )
        : res.redirect('/auth/steam')
    })

    app.get('/auth/steam', steam.authenticate(), function (req, res) {
      res.redirect('/')
    })

    app.get('/auth/steam/callback', steam.verify(), function (req, res) {
      res.redirect('/')
    })

    app.get('/logout', steam.enforceLogin('/'), function (req, res) {
      req.logout()
      res.sendStatus(200)
    })
  } else {
    app.use((req, res, next) => {
      req.user = userMock
      next();
    })
    app.use('/user', user)
    app.use('/steam', steamRouter)
  }


  const PORT = process.env.PORT || 5000
  app.listen(PORT)
})