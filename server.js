require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const passport = require("passport")
const Session = require('express-session')
const MongoStore = require('connect-mongo')

const cors = require('cors')
const morgan = require('morgan')

const AuthRouter = require('./routes/AuthRouter')
const CommunityRouter = require('./routes/communityRouter')
const ClientRouter = require('./routes/ClientRouter')

const ErrorHandler = require('./controllers/errorHandler')

const server = express()

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(morgan("dev"))
server.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))

// authentification
server.use(Session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongoUrl: process.env.DB_STRING,
    dbName: 'samah',
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // one week in milliseconds
    httpOnly: true,
    secure: true,
    sameSite: "none"
  }
}))

require('./utils/passport')
server.use(passport.initialize());
server.use(passport.session());

server.use("/auth", AuthRouter);
server.use('/community', CommunityRouter);
server.use('/client', ClientRouter);

server.get("/", (req, res, next) => {
  res.send('welcome to SAMAH API');
})

server.use(ErrorHandler)

module.exports = { server, mongoose }