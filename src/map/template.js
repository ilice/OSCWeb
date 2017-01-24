var yo = require('yo-yo')
var empty = require('empty-element')
var GoogleMapsLoader = require('google-maps') // only for common js environments

GoogleMapsLoader.KEY = 'AIzaSyB-K-4XmS9a5ItnkrqJSS9070qAeRuXt6M'
GoogleMapsLoader.LIBRARIES = ['places']

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
