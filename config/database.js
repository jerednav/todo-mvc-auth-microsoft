const mongoose = require('mongoose')
//connects to MongoDB through Mongooose
//MongoDB = database
//mongo atlas = hosting the database, create a new project

//need to know 2 things:
//1. using a DB string, the unique string to my database that Mongo Atlas is provisioning for me
//    DB string is found in .env file to hide from others
//2. the console.log lets uw know that we are connected if the server is working
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB
