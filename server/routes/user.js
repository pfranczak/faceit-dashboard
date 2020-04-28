const express = require('express')
const router = express.Router()
const helpers = require('./helpers')
router.get('/', (req, res) => {
  res.send(req.user)
})

router.get('/friends/:id', async (req, res) => {
  const friends = await helpers.getDbFriends(req.params.id)
  res.send(friends)
})

router.post('/addFriend/:userId/:addUserId', async (req, res) => {
  console.log(req.params.userId)
  const userId = req.params.userId
  const addUserId = req.params.addUserId

  const userData = await helpers.getDbFriends(userId)
  const user = await helpers.getUser(userId)

  if(!userData.includes(addUserId)){
    await helpers.addUser(user, addUserId)
  }
  res.sendStatus(200)
})

router.get('/maps', (req, res) => {
  res.send('YOUR maps XD')
})

router.get('/add', (req, res) => {
  console.log('ADD')
  // const collection = db().collection("users");
  // const user1 = {'userid': req.userid}
  // collection.insertOne(user1, function (err, res){
  //   if(err) throw err;
  //   console.log("1 user added")
  // })
})

module.exports = router