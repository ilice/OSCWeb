const Geohash = require('geohash.js')

function decodeBuckets (buckets) {
  if (Array.isArray(buckets)) {
    var geojson = {type: 'FeatureCollection', features: []}
    buckets.forEach(function (bucket) {
      geojson.features.push(getFeature(Geohash.decode(bucket.key), bucket.doc_count))
    })
    return geojson
  }
}

function getFeature (coordinates, value) {
  var feature = {type: 'Feature'}
  feature.geometry = buildGeometry(coordinates)
  feature.properties = {value: value}
  return feature
}

function buildGeometry (coordinates) {
  var geom = {
    type: 'Point',
    coordinates: [
      coordinates[1],
      coordinates[0]
    ]
  }
  return geom
}

module.exports = {
  decode: function (geohash) {
    return Geohash.decode(geohash)
  },

  encode: function (lat, lng) {
    return Geohash.encode(lat, lng)
  },

  decodeBuckets: decodeBuckets
}
