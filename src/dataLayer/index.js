var request = require('superagent')

function createLayerFromBoundingBox (bbox, next) {
  var layer
  checkBbox(bbox, next)
  loadLayer(layer, bbox, next)
}

function checkBbox (bbox, next) {
  if (!bbox) {
    next(new ReferenceError('Bounding box cannot be empty'))
  }
  if (bbox.length !== 4) next(new Error('Bounding box must be a 4 array'))
  bbox.forEach(function (element) {
    if (typeof element !== 'number') next(Error('Bounding box elements must be a number'))
  })
}

function loadLayer (layer, bbox, next) {
  request
  .get('https://opensmartcountry.com/cadastral/parcel')
  .query({ bbox: bbox.toString() })
  .end(function (err, res) {
    if (err) return console.log(err)
    layer = res.body
    next(err, layer)
  })
}

module.exports = {
  createLayerFromBoundingBox: createLayerFromBoundingBox
}
