var express = require('express')
var http = require('http')
var path = require('path')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var PORT = process.env.PORT || 3030
var MONGODB_URI = process.env.MONGODB_URI
  ? process.env.MONGODB_URI + '/scores'
  : 'mongodb://localhost/scores'

mongoose.connect(MONGODB_URI)

var scoreSchema = new mongoose.Schema({
  name: { type: String, default: 'unknown' },
  mode: { type: String, default: 'normal' },
  time: String,
  date: { type: Date, default: Date.now }
})
var Score = mongoose.model('Score', scoreSchema)

var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/build'))
}

app.post('/submit', (req, res) => {
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

app.get('/scores', (req, res) => {
  Score.find()
    .sort('-time')
    .select('time name mode date')
    .exec((err, scores) => {
      if (err) {
        res.send(err)
      } else {
        res.jsonp(scores)
      }
    })
})

app.listen(PORT)
