var expect = require('chai').expect

describe('Test geo-hash package', function () {
  describe('#[lat,lng] => geohash => [lat,lng]', function () {
    it('should obtain the same values for 5 decimals coordinates', function () {
      const Geohash = require('geo-hash')
      var lat = 39.90882
      var lng = 116.39750

      var hash = Geohash.encode(lat, lng)

      var result = Geohash.decode(hash)

      expect(Math.round(result.lat * Math.pow(10, (lat + '').split('.')[1].length)) / Math.pow(10, (lat + '').split('.')[1].length)).to.equal(lat)
      expect(Math.round(result.lon * Math.pow(10, (lng + '').split('.')[1].length)) / Math.pow(10, (lng + '').split('.')[1].length)).to.equal(lng)
    })

    it('should obtain the same values for 4 decimals coordinates', function () {
      const Geohash = require('geo-hash')
      var lat = 39.9088
      var lng = 116.3975

      var hash = Geohash.encode(lat, lng)

      var result = Geohash.decode(hash)

      expect(Math.round(result.lat * Math.pow(10, (lat + '').split('.')[1].length)) / Math.pow(10, (lat + '').split('.')[1].length)).to.equal(lat)
      expect(Math.round(result.lon * Math.pow(10, (lng + '').split('.')[1].length)) / Math.pow(10, (lng + '').split('.')[1].length)).to.equal(lng)
    })

    it('should obtain the same values for 3 decimals coordinates', function () {
      const Geohash = require('geo-hash')
      var lat = 39.908
      var lng = 116.397

      var hash = Geohash.encode(lat, lng)

      var result = Geohash.decode(hash)

      expect(Math.round(result.lat * Math.pow(10, (lat + '').split('.')[1].length)) / Math.pow(10, (lat + '').split('.')[1].length)).to.equal(lat)
      expect(Math.round(result.lon * Math.pow(10, (lng + '').split('.')[1].length)) / Math.pow(10, (lng + '').split('.')[1].length)).to.equal(lng)
    })

    it('should obtain the same values for 2 decimals coordinates', function () {
      const Geohash = require('geo-hash')
      var lat = 39.90
      var lng = 116.39

      var hash = Geohash.encode(lat, lng)

      var result = Geohash.decode(hash)

      expect(Math.round(result.lat * Math.pow(10, (lat + '').split('.')[1].length)) / Math.pow(10, (lat + '').split('.')[1].length)).to.equal(lat)
      expect(Math.round(result.lon * Math.pow(10, (lng + '').split('.')[1].length)) / Math.pow(10, (lng + '').split('.')[1].length)).to.equal(lng)
    })

    it('should obtain the same values for 1 decimals coordinates', function () {
      const Geohash = require('geo-hash')
      var lat = 39.9
      var lng = 116.3

      var hash = Geohash.encode(lat, lng)

      var result = Geohash.decode(hash)

      expect(Math.round(result.lat * Math.pow(10, (lat + '').split('.')[1].length)) / Math.pow(10, (lat + '').split('.')[1].length)).to.equal(lat)
      expect(Math.round(result.lon * Math.pow(10, (lng + '').split('.')[1].length)) / Math.pow(10, (lng + '').split('.')[1].length)).to.equal(lng)
    })

    it('should obtain the same values for 0 decimals coordinates', function () {
      const Geohash = require('geo-hash')
      var lat = 39
      var lng = 116

      var hash = Geohash.encode(lat, lng)

      var result = Geohash.decode(hash)

      expect(Math.round(result.lat * Math.pow(10, 0) / Math.pow(10, 0))).to.equal(lat)
      expect(Math.round(result.lon * Math.pow(10, 0) / Math.pow(10, 0))).to.equal(lng)
    })
  })

  describe('#geohash => [lat,lng] => geohash', function () {
    it('should obtain the same values for 12 length hash', function () {
      const Geohash = require('geo-hash')
      var hash = '6gkzwgjzn820'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng.lat, latlng.lon)

      expect(result.substring(0, hash.length)).to.equal(hash)
    })

    it('should obtain the same values for 11 length hash', function () {
      const Geohash = require('geo-hash')
      var hash = 'wx4g09njdr6'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng.lat, latlng.lon)

      expect(result.substring(0, hash.length)).to.equal(hash)
    })

    it('should obtain the same values for 10 length hash', function () {
      const Geohash = require('geo-hash')
      var hash = 'wx4g09njdr'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng.lat, latlng.lon)

      expect(result.substring(0, hash.length)).to.equal(hash)
    })

    it('should obtain the same values for 9 length hash', function () {
      const Geohash = require('geo-hash')
      var hash = 'wx4g09njd'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng.lat, latlng.lon)

      expect(result.substring(0, hash.length)).to.equal(hash)
    })

    it('should obtain the same values for 8 length hash', function () {
      const Geohash = require('geo-hash')
      var hash = 'wx4g09nj'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng.lat, latlng.lon)

      expect(result.substring(0, hash.length)).to.equal(hash)
    })

    it('should obtain the same values for 7 length hash', function () {
      const Geohash = require('geo-hash')
      var hash = 'wx4g09n'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng.lat, latlng.lon)

      expect(result.substring(0, hash.length)).to.equal(hash)
    })

    it('should obtain the same values for 6 length hash', function () {
      const Geohash = require('geo-hash')
      var hash = 'wx4g09'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng.lat, latlng.lon)

      expect(result.substring(0, hash.length)).to.equal(hash)
    })

    it('should obtain the same values for 5 precision', function () {
      const Geohash = require('geo-hash')
      var hash = 'wx4g0'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng.lat, latlng.lon)

      expect(result.substring(0, hash.length)).to.equal(hash)
    })

    it('should obtain the same values for 4 precision', function () {
      const Geohash = require('geo-hash')
      var hash = 'wx4g'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng.lat, latlng.lon)

      expect(result.substring(0, hash.length)).to.equal(hash)
    })

    it('should obtain the same values for 3 precision', function () {
      const Geohash = require('geo-hash')
      var hash = 'wx4'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng.lat, latlng.lon)

      expect(result.substring(0, hash.length)).to.equal(hash)
    })

    it('should obtain the same values for 2 precision', function () {
      const Geohash = require('geo-hash')
      var hash = 'wx'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng.lat, latlng.lon)

      expect(result.substring(0, hash.length)).to.equal(hash)
    })

    it('should obtain the same values for 1 precision', function () {
      const Geohash = require('geo-hash')
      var hash = 'wx'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng.lat, latlng.lon)

      expect(result.substring(0, hash.length)).to.equal(hash)
    })
  })
})
