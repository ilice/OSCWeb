require('es6-promise').polyfill()
require('isomorphic-fetch')
const env = require('../env')
const color = require('./cadastralClasificationColors')

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
    fetch(env.CADASTRAL_PARCEL_URI + '?bbox=' + bbox.toString() + '&format=json')
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

function wrapParcelData (dataFeature) {
  return {
    nationalCadastralReference: dataFeature.getProperty('nationalCadastralReference'),
    elevation: dataFeature.getProperty('elevation'),
    areaValue: dataFeature.getProperty('areaValue'),
    address: getAddress(dataFeature),
    constructionUnits: getConstructionUnits(dataFeature),
    cadastralUse: getCadastralUse(dataFeature),
    sigpacUse: getSigpacUse(dataFeature)
  }
}

function getAddress (dataFeature) {
  if (dataFeature.getProperty('cadastralData')) {
    return dataFeature.getProperty('cadastralData').address
  }
}

function getConstructionUnits (dataFeature) {
  if (dataFeature.getProperty('cadastralData')) {
    return dataFeature.getProperty('cadastralData').constructionUnits
  } else {
    return 0
  }
}

function getCadastralClasificationColor (feature) {
  return color[getCadastralUse(feature)]
}

function getSigpacClasificationColor (feature) {
  return color[getSigpacUse(feature)]
}

function getCadastralUse (feature) {
  if (feature.getProperty('cadastralData')) {
    return feature.getProperty('cadastralData').use
  } else {
    return 'no_use_defined'
  }
}

function getSigpacUse (feature) {
  if (feature.getProperty('sigpacData')) {
    return feature.getProperty('sigpacData').use
  } else {
    return 'no_use_defined'
  }
}

module.exports = {
  createLayerFromBoundingBox: createLayerFromBoundingBox,
  getCadastralClasificationColor: getCadastralClasificationColor,
  getSigpacClasificationColor: getSigpacClasificationColor,
  wrapParcelData: wrapParcelData
}
