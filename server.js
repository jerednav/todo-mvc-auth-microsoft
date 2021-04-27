const express = require('express') //help build out API
const app = express()
const mongoose = require('mongoose') //build out models and talking to database
const passport = require('passport') //comes with a nice strategy we can use to tal to Microsoft
identity platform
const session = require('express-session') //to stay logged in
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/database') //access database through config folder 
//and we can use the callback function connectDB
const authRoutes = require('./routes/auth') //requests for authentication
const homeRoutes = require('./routes/home') //home page
const todoRoutes = require('./routes/todos') //requests for todos
//servers will hear the request and hand it off to the appropriate controller, to seperate our concerns
//making sure my requests are making it to the correct controller

require('dotenv').config({path: './config/.env'}) //allowing us to use our .env file in the application

// Passport config
require('./config/passport')(passport)//require a file that will handle passport stuff

connectDB() //callback function and telling it to run, which will connect us to our database

app.set('view engine', 'ejs') //use ejs as view engine, pass our data into to make it HTML
app.use(express.static('public')) //enable us to use express to handle our static files (Javascript)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//looking at data that's being sent with our request

// Sessions
app.use( //keeping our users logged in
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }), 
        //storing each of our sessions into mongoDB
        //making sure once our users are logged in, they can stay logged in
    })
  )
  
// Passport middleware
app.use(passport.initialize()) 
app.use(passport.session())
//to set up passport and our session, so users can stay logged in.

  
app.use('/', homeRoutes) //home page
app.use('/auth', authRoutes) 
app.use('/todos', todoRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    //our server is listening and is ready to run
