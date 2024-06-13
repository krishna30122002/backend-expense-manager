const mongoose = require('mongoose')
const colors = require('colors')
const { default: ConsoleHelperBackend } = require('../ConsoleHelperBackend')

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        ConsoleHelperBackend(`Server is running on ${mongoose.connection.host}`.bgCyan.white)
    } catch (error) {
        ConsoleHelperBackend(`${error}`.bgRed)
    }
}
module.exports = connectDb