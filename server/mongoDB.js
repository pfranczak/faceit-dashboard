const MongoClient = require('mongodb').MongoClient

const MONGO_URL = process.env.database

const connectDB = async (callback) => {
  try {
    MongoClient.connect(MONGO_URL, (err, db) => {
      _db = db.db('csgobuff')
      return callback(_db)
    })
  } catch (e) {
      throw e
  }
}

const getDB = () => _db
const disconnectDB = () => _db.close()

module.exports = { connectDB, getDB, disconnectDB }