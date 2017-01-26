var yo = require('yo-yo')
var empty = require('empty-element')
var GoogleMapsLoader = require('google-maps') // only for common js environments
const env = require('../env')

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
    map.addListener('idle', function () {
      var bbox = map.getBounds()
      var area = computeArea(bbox)
      if (area <= 2000000) {
        var url = env.CADASTRAL_PARCEL_URI + '?bbox=' + getOptimalBbox(bbox).toUrlValue()
        map.data.loadGeoJson(url)
      }
    })
  })

  return empty(mapContainer).appendChild(el)
}

function getOptimalBbox (bbox) {
  var reducedBbox = bbox
  if (computeArea(bbox) > 500000) {
    var distance = google.maps.geometry.spherical.computeDistanceBetween(
      bbox.getSouthWest(), bbox.getNorthEast())
    var offsetdistance = distance * 0.1
    reducedBbox = new google.maps.LatLngBounds(
      google.maps.geometry.spherical.computeOffset(bbox
        .getSouthWest(), offsetdistance, 45),
            google.maps.geometry.spherical.computeOffset(bbox
              .getNorthEast(), offsetdistance, -135))
  }
  return reducedBbox
}

function computeArea (bbox) {
  var area = 0

  var northEastCorner = bbox.getNorthEast()
  var southWestCorner = bbox.getSouthWest()
  var northWestCorner = new google.maps.LatLng(northEastCorner.lat(),
southWestCorner.lng())

  area = google.maps.geometry.spherical.computeDistanceBetween(
northEastCorner, northWestCorner) * google.maps.geometry.spherical.computeDistanceBetween(
northWestCorner, southWestCorner)

  return area
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
