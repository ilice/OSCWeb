var request = require('superagent')

function createLayerFromBoundingBox (bbox, next) {
  var layer
  loadLayer(layer, bbox, next)
}

function checkBbox (bbox) {
  if (!bbox) return new ReferenceError('Bounding box cannot be empty')

  if (bbox.length !== 4) return new Error('Bounding box must be a 4 array')

  var err
  bbox.forEach(item => { if (typeof item !== 'number') err = new Error('Bounding box elements must be a number') })
  return err
}

function loadLayer (layer, bbox, next) {
  var err = checkBbox(bbox)
  if (!err) {
    request
  .get('https://opensmartcountry.com/cadastral/parcel')
  .query({ bbox: bbox.toString() })
  .end(function (err, res) {
    if (err) return console.log(err)
    layer = res.body
    next(err, layer)
  })
  } else {
    next(err)
  }
}

module.exports = {
  createLayerFromBoundingBox: createLayerFromBoundingBox
}
