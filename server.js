var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var PORT = process.env.PORT || 3030
var MONGODB_URI = process.env.MONGODB_URI
  ? process.env.MONGODB_URI + '/scores'
  : 'mongodb://localhost/scores'

var scoreSchema = new mongoose.Schema({
  name: { type: String, default: 'unknown' },
  mode: { type: String, default: 'normal' },
  time: String,
  crown: Boolean,
  number: Number,
  date: { type: Date, default: Date.now }
})
var Score = mongoose.model('Score', scoreSchema)

var app = express()
app.use('/', express.static(path.join(__dirname, 'build')))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.connect(MONGODB_URI)

var router = express.Router()

router.get('/scores', (req, res) => {
  Score.find()
    .sort('-time')
    .select('time name number date crown')
    .exec((err, scores) => {
      if (err) {
        res.send(err)
      } else {
        res.jsonp(scores)
      }
    })
})

router.post('/submit', (req, res) => {
  if (req.body) {
    var score = new Score(req.body)
    score.save((err) => {
        if (err) {
          res.send(err)
        } else {
          res.sendStatus(200)
        }
      })
  } else {
    res.send(new Error('nothing sent'))
  }
})

app.use('/api', router)

app.listen(PORT)
