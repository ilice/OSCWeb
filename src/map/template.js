var yo = require('yo-yo')
var empty = require('empty-element')
var GoogleMapsLoader = require('google-maps') // only for common js environments
const env = require('../env')
const status = require('../status')
const pane = require('../pane')
const dataLayer = require('../dataLayer')
const translate = require('../translate')

GoogleMapsLoader.KEY = env.GOOGLE_API_KEY
GoogleMapsLoader.LIBRARIES = ['places', 'geometry']

var map

function addMap (mapContainer, callback) {
  var el = yo `<div id="map"></>`

  var kilometroCero = {
    lat: 40.416616,
    lng: -3.703801
  }

  var spainZoom = 7

  GoogleMapsLoader.load(function (google) {
    map = new google.maps.Map(el, {
      center: kilometroCero,
      zoom: spainZoom,
      mapTypeControlOptions: {
        mapTypeIds: []
      }
    })

    // Add a basic style.
    map.data.setStyle(function (feature) {
      var scaleWidth = feature.getProperty('max_value') - feature.getProperty('min_value')
      var ratedValue = scaleWidth > 1 ? (feature.getProperty('value') - feature.getProperty('min_value')) / scaleWidth : 1
      var mag = 20 * ratedValue
      var fillColor = ratedValue > 0.7 ? '#f00' : ratedValue < 0.2 ? '#1f990c' : '#ffbb00'
      var color = dataLayer.getCadastralClasificationColor(feature)
      var strokeColor = dataLayer.getSigpacClasificationColor(feature)
      var title = translate.message('num-parcels', {amount: feature.getProperty('value')})

      return /** @type {google.maps.Data.StyleOptions} */({
        fillColor: color,
        title: title,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: mag,
          fillColor: fillColor,
          strokeColor: strokeColor,
          fillOpacity: 0.35,
          strokeWeight: 0
        }
      })
    })

    map.addListener('idle', function () {
      status.loading()
      var bbox = map.getBounds()

      map.data.forEach(function (feature) {
        map.data.remove(feature)
      })

      var precision = map.getZoom() < 17 ? '&precision=' + (map.getZoom() / 2).toFixed() : ''
      var bboxURL = 'bbox=' + bbox.toJSON().west + ',' + bbox.toJSON().south + ',' + bbox.toJSON().east + ',' + bbox.toJSON().north
      var url = env.CADASTRAL_PARCEL_URI + '?' + bboxURL + precision + '&format=json'
      map.data.loadGeoJson(url, null, status.loaded)
    })

    map.data.addListener('click', function (event) {
      if (event.feature.getGeometry().getType() === 'Point') {
        event.feature.getGeometry().forEachLatLng(function (latLng) { map.setOptions({center: latLng, zoom: 12}) })
      }
      pane.show(event.feature)
      map.data.revertStyle()
      map.data.overrideStyle(event.feature, {strokeColor: dataLayer.getSigpacClasificationColor(event.feature), strokeWeight: 1})
    })

    map.addListener('click', pane.close)
  })

  return empty(mapContainer).appendChild(el)
}

function bindTo (omnibox) {
  GoogleMapsLoader.load(function (google) {
    var autocomplete = new google.maps.places.Autocomplete(omnibox.input)
    autocomplete.bindTo('bounds', map)

    var geocoder = new google.maps.Geocoder()

    function geocode (address) {
      geocoder.geocode({'address': address}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          map.fitBounds(results[0].geometry.viewport)
        } else {
          console.log('Geocode was not successful for the following reason: ' + status)
        }
      })
    }

    omnibox.searchButton.addEventListener('click', function () {
      geocode(omnibox.input.value)
    })

    omnibox.input.addEventListener('keyup', (event) => { event.key === 'Enter' ? (geocode(omnibox.input.value), omnibox.input.blur()) : null }, false)
  })
}

module.exports = {
  addMap: addMap,
  bindTo: bindTo
}
