var express = require('express')
var app = express()

var options = {
  root: __dirname,
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
}

var fileName = 'index.html'

app.use('/public', express.static('public'))
app.use('/fonts', express.static('fonts'))

app.get('/', function (req, res) {
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err)
      res.status(err.status).end()
    } else {
      console.log('Sent:', fileName)
    }
  })
})

app.get('/osc', function (req, res) {
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err)
      res.status(err.status).end()
    } else {
      console.log('Sent:', fileName)
    }
  })
})
// /mock/cadastral/parcel/?bbox=37.386812,-9.429769,43.025548,2.206815
app.get('/mock/cadastral/parcel', function (req, res) {
  var bbox = req.query.bbox.split(',')
  var file
  if (bbox[2] - bbox[0] > 1) {
    file = './test/fixtures/cadastral_parcel_point_sample_geoJSON.json'
  } else {
    file = './test/fixtures/cadastral_parcel_sample.json'
  }

  res.sendFile(file, options, function (err) {
    if (err) {
      console.log(err)
      res.status(err.status).end()
    } else {
      console.log('Sent:', fileName)
    }
  })
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(8000, function (err) {
  if (err) return console.log('Error', process.exit(1))

  console.log('osc listening on port 8000!')
})
