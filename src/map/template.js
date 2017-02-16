var yo = require('yo-yo')
var empty = require('empty-element')
var GoogleMapsLoader = require('google-maps') // only for common js environments
const env = require('../env')
const status = require('../status')
const pane = require('../pane')
const dataLayer = require('../dataLayer')

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
      var mag = parseFloat(feature.getProperty('value')) * 0.001
      var color = dataLayer.getCadastralClasificationColor(feature)

      return /** @type {google.maps.Data.StyleOptions} */({
        fillColor: color,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: mag,
          fillColor: '#f00',
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

      var url = env.CADASTRAL_PARCEL_URI + '?bbox=' + bbox.toUrlValue()
      map.data.loadGeoJson(url, null, status.loaded)
    })

    map.data.addListener('click', function (event) {
      pane.show(event.feature)
      map.data.revertStyle()
      map.data.overrideStyle(event.feature, {strokeColor: '#f00'})
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
