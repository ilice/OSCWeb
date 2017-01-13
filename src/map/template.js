var yo = require('yo-yo')
var GoogleMapsLoader = require('google-maps') // only for common js environments

GoogleMapsLoader.KEY = 'AIzaSyB-K-4XmS9a5ItnkrqJSS9070qAeRuXt6M'

var el = yo `<div id="map"></>`

var kilometroCero = {
  lat: 40.416616,
  lng: -3.703801
}

var spainZoom = 7

var map

GoogleMapsLoader.load(function (google) {
  map = new google.maps.Map(el, {
    center: kilometroCero,
    zoom: spainZoom
  })
})

function draw () {
  google.maps.event.trigger(map, 'resize')
}

module.exports = {
  map: el,
  draw: draw
}
