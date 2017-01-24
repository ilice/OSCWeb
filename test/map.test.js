// var jsdom = require('jsdom')

describe('Map', function () {
  window.GoogleMapsLoader = require('google-maps')

  // TODO: Uncomment for view Google Maps API error: RefererNotAllowedMapError
  // afterEach(function (done) {
  //   setTimeout(function () {
  //     done()
  //   }, 10000)
  // })

  describe('#addMap', function () {
    it('should load google api object', function (done) {
      // TODO: This test does not ensure that Google responds correctly, only responds
      var map = require('../src/map')

      // TODO: Uncommenting this line resolves the Google Maps API error: RefererNotAllowedMapError
      // jsdom.changeURL(window, 'http://localhost:8000/')
      window.GoogleMapsLoader.onLoad(function (googleMap) {
        if (!googleMap.maps) {
          done(new Error('Error loading google maps, result map'))
        } else {
          done()
        }
      })
      var mapContainer = document.createElement('div')
      map.addMap(mapContainer)
    })
  })
})
