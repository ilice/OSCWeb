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
var geocoder
var marker

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
      map.setCenter(results[0].geometry.location)
      if (!marker) {
        marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          draggable: true
        })
        marker.addListener('click', toggleBounce)
      } else {
        marker.setPosition(results[0].geometry.location)
      }
    } else {
      console.log('Geocode was not successful for the following reason: ' + status)
    }
  })
}

function toggleBounce () {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null)
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE)
  }
}

module.exports = {
  map: el,
  draw: draw,
  geocode: geocode
}
