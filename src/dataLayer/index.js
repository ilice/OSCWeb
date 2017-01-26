require('es6-promise').polyfill()
require('isomorphic-fetch')
const env = require('../env')

function createLayerFromBoundingBox (bbox, next) {
  var layer
  loadLayer(layer, bbox, next)
}

function checkBbox (bbox) {
  if (!bbox) return new ReferenceError('Bounding box cannot be empty')

  if (typeof bbox === 'string') return false

  if (bbox.length !== 4) return new Error('Bounding box must be a 4 array')

  var err
  bbox.forEach(item => { if (typeof item !== 'number') err = new Error('Bounding box elements must be a number') })
  return err
}

function loadLayer (layer, bbox, next) {
  var err = checkBbox(bbox)
  if (!err) {
    fetch(env.CADASTRAL_PARCEL_URI + '/?bbox=' + bbox.toString())
      .then(function (res) {
        return res.json()
      })
      .then(function (layer) {
        next(null, layer)
      })
      .catch(function (err) {
        console.log(err)
      })
  } else {
    console.log(err)
    next(err)
  }
}

module.exports = {
  createLayerFromBoundingBox: createLayerFromBoundingBox
}
