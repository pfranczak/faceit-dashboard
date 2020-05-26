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
  const userId = req.params.userId
  const addUserId = req.params.addUserId

  const userData = await helpers.getDbFriends(userId)
  const user = await helpers.getUser(userId)

  if(!userData.includes(addUserId)){
    await helpers.addUser(user, addUserId)
  }
  res.sendStatus(200)
})

router.post('/delete/:userId/:removeUserId', async (req, res) => {
  const userId = req.params.userId
  const removeUserId = req.params.removeUserId

  await helpers.deleteUser(userId, removeUserId)

  res.sendStatus(200)
})

router.get('/maps', (req, res) => {
  res.send('YOUR maps XD')
})

router.get('/translate/:word', (req, res) => {
    console.log(req.params.word)
    try {
        axios.get(`https://pl.bab.la/slownik/angielski-polski/${req.params.word}`).then((response) => {
            const $ = cheerio.load(response.data);
            let translations = $($('.sense-group-results')[0]).text().replace(/\r?\n|\r|\s/g, ' ').trim()
                .replace(/\s/g, ',');
            translations = translations.split(',').filter(a => !!a);
            res.send(translations)
        })
    } catch (e) {
        res.sendStatus(404)
    }
})

router.get('/translate', (req, res) => {
    res.send('translate')
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
