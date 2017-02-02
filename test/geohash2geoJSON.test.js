var expect = require('chai').expect

describe('Converts objets with Geohash to geoJSON', function () {
  describe('#Geohash to point', function () {
    it('should obtain point for geohash value', function () {
      var geohash = 'ezd0q'
      const geohash2geoJSON = require('../src/geohash2geoJSON')
      var point = geohash2geoJSON.decode(geohash)
      expect(point).to.not.be.a('null')
      expect(point).to.be.a('array')
      expect(point).to.have.lengthOf(2)
      expect(point[0]).to.be.a('number')
      expect(point[0]).to.be.within(-90, 90)
      expect(point[1]).to.be.a('number')
      expect(point[1]).to.be.within(-180, 180)
    })
  })

  describe('#Point to geohash', function () {
    it('should obtain heohash for point value', function () {
      var lat = 39.9088
      var lng = 116.3975

      const geohash2geoJSON = require('../src/geohash2geoJSON')
      var hash = geohash2geoJSON.encode(lat, lng)
      expect(hash).to.not.be.a('null')
      expect(hash).to.be.a('string')
    })
  })

  describe('#Buckets to geoJSON', function () {
    it('should obtain geoJSON for bucket array', function () {
      var cadastralParcelPointSample = {
        'took': 1224,
        'timed_out': false,
        '_shards': {
          'total': 5,
          'successful': 5,
          'failed': 0
        },
        'hits': {
          'total': 41432531,
          'max_score': 0,
          'hits': []
        },
        'aggregations': {
          '2': {
            'buckets': [
              {
                'key': 'ezd0q',
                'doc_count': 41299
              },
              {
                'key': 'ezd0t',
                'doc_count': 37703
              },
              {
                'key': 'ezd21',
                'doc_count': 30695
              }]
          }
        }
      }

      const geohash2geoJSON = require('../src/geohash2geoJSON')
      var geoJSON = geohash2geoJSON.decodeBuckets(cadastralParcelPointSample.aggregations['2'].buckets)
      expect(geoJSON).to.not.be.a('null')
      expect(geoJSON).to.be.an('object')
      expect(geoJSON).to.have.property('type', 'FeatureCollection')
      expect(geoJSON).to.have.property('features')
      expect(geoJSON.features.length).to.be.at.least(1, 'should obtain at least 2 cadastral parcel')
      geoJSON.features.forEach(function (feature) {
        expect(feature).to.have.property('type', 'Feature')
        expect(feature).to.have.property('geometry')
        expect(feature.geometry).to.have.property('type', 'Point')
        expect(feature.geometry).to.have.property('coordinates')
        expect(feature.geometry.coordinates.length).to.be.at.least(2, 'should obtain at least lat and long coordinates')
        expect(feature.properties).to.be.an('object')
        expect(feature.properties.value).to.not.be.a('null')
        expect(feature.properties.value).to.be.a('number')
      })
    })
  })

  describe('#Buckets to geoJSON file', function () {
    it('should write geoJSON file for buckets', function (done) {
      const jsonfile = require('jsonfile')

      var file = './test/fixtures/cadastral_parcel_point_sample.json'

      jsonfile.readFile(file, function (err, obj) {
        if (!err) {
          var outputfile = './test/fixtures/cadastral_parcel_point_sample_geoJSON.json'
          const geohash2geoJSON = require('../src/geohash2geoJSON')
          obj = geohash2geoJSON.decodeBuckets(obj.aggregations['2'].buckets)
          jsonfile.writeFile(outputfile, obj, function (err) {
            if (err) {
              console.error(err)
            }
            done()
          })
        } else {
          console.error(err)
          done()
        }
      })
    })
  })
})
