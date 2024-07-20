const dotenv = require('dotenv')
dotenv.config()

const MongoClient = require('mongodb').MongoClient

let database

const initDb = (callback) => {
    if(database) {
        console.log('Db is already initialized!')
        return callback(null, database)
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client
            callback(null, database)
        })
        .catch((err) => {
            callback(err)
        })
}

const getDatabase = () => {
    if(!database) {
        console.log("something is going wrong")
        throw Error('Database not initialized!')
    }
    return database
}

module.exports = {
    initDb,
    getDatabase
}