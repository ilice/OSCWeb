var yo = require('yo-yo')
var GoogleMapsLoader = require('google-maps') // only for common js environments

GoogleMapsLoader.KEY = 'AIzaSyB-K-4XmS9a5ItnkrqJSS9070qAeRuXt6M'
GoogleMapsLoader.LIBRARIES = ['places']

var el = yo `<div id="map"></>`

var kilometroCero = {
  lat: 40.416616,
  lng: -3.703801
}

var spainZoom = 7

var map
var geocoder

GoogleMapsLoader.load(function (google) {
  map = new google.maps.Map(el, {
    center: kilometroCero,
    zoom: spainZoom,
    mapTypeControlOptions: {
      mapTypeIds: []
    }
  })

  geocoder = new google.maps.Geocoder()
})

function draw () {
  google.maps.event.trigger(map, 'resize')
}

function geocode (address) {
  geocoder.geocode({'address': address}, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      map.fitBounds(results[0].geometry.viewport)
    } else {
      console.log('Geocode was not successful for the following reason: ' + status)
    }
  })
}

function autocomplete (input) {
  var autocomplete = new google.maps.places.Autocomplete(input)
  autocomplete.bindTo('bounds', map)
}

module.exports = {
  map: el,
  draw: draw,
  geocode: geocode,
  autocomplete: autocomplete
}
