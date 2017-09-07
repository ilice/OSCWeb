'use strict'
const parcel_feature_sample = require('./parcel_feature_sample.json')

let google_maps_parcel_feature = parcel_feature_sample

//Adds methods (getProperty and getGeometry) from google.maps.Data.Feature class
google_maps_parcel_feature.getProperty = function getProperty (property) {
  return google_maps_parcel_feature.properties[property]
}

google_maps_parcel_feature.getGeometry = function getGeometry () {
  var geometry = google_maps_parcel_feature.geometry
  geometry.getType = function getType () {
    return geometry.type
  }
  return geometry
}

const fixtures = {
  getGoogleMapsParcelFeature () {
    return google_maps_parcel_feature
  }
}

module.exports = fixtures
