var expect = require('chai').expect

describe('Data Layer', function () {
  describe('#Get Parcels', function () {
    it('should obtain FeatureCollection for bounding box', function (done) {
      var dataLayer = require('../src/dataLayer')
      var bbox = [40.437603, -5.762986, 40.439442, -5.757841]
      dataLayer.createLayerFromBoundingBox(bbox,
        function (err, layer) {
          expect(err).to.be.a('null')
          expect(layer).to.not.be.a('string')
          done()
        })
    })

    it('should return error if bounding box is empty', function (done) {
      var dataLayer = require('../src/dataLayer')

      var bbox
      dataLayer.createLayerFromBoundingBox(bbox, function (err) {
        expect(err).to.be.an('error')
        expect(err).to.be.an.instanceof(ReferenceError)
        expect(err.message).to.be.equal('Bounding box cannot be empty')
        done()
      })
    })

    it('should return error if bounding box is empty string', function (done) {
      var dataLayer = require('../src/dataLayer')
      var bbox = ''
      dataLayer.createLayerFromBoundingBox(bbox, function (err) {
        expect(err).to.be.an('error')
        expect(err).to.be.an.instanceof(ReferenceError)
        expect(err.message).to.be.equal('Bounding box cannot be empty')
        done()
      })
    })

    it('should return error if bounding box is null', function (done) {
      var dataLayer = require('../src/dataLayer')
      var bbox = null
      dataLayer.createLayerFromBoundingBox(bbox, function (err) {
        expect(err).to.be.an('error')
        expect(err).to.be.an.instanceof(ReferenceError)
        expect(err.message).to.be.equal('Bounding box cannot be empty')
        done()
      })
    })

    it('Bounding Box parameter should respect bbox format', function (done) {
      var dataLayer = require('../src/dataLayer')
      var bbox = [40.437603, -5.762986, 40.439442, -5.757841]
      dataLayer.createLayerFromBoundingBox(bbox, function (err, layer) {
        expect(err).to.be.a('null')
        expect(layer).to.have.property('type', 'FeatureCollection')
        done()
      })
    })

    it('should return error if bounding Box parameter length is not four', function (done) {
      var dataLayer = require('../src/dataLayer')
      var bbox = [40.437603, -5.762986, 40.439442]
      dataLayer.createLayerFromBoundingBox(bbox, function (err, layer) {
        expect(err).to.be.an('error')
        expect(err).to.be.an.instanceof(Error)
        expect(err.message).to.be.equal('Bounding box must be a 4 array')
        done()
      })
    })

    it('should return error if Bounding Box parameter elements are not numbers', function (done) {
      var dataLayer = require('../src/dataLayer')
      var bbox = [40.437603, -5.762986, '40.439442', -5.757841]
      dataLayer.createLayerFromBoundingBox(bbox, function (err, layer) {
        expect(err).to.be.an('error')
        expect(err).to.be.an.instanceof(Error)
        expect(err.message).to.be.equal('Bounding box elements must be a number')
        done()
      })
    })

    it('should obtain poligon coordinates for Feature cadastral parcel in bounding box', function () {
      var dataLayer = require('../src/dataLayer')
      var bbox = [40.43917746743397, -5.757829017646071, 40.439409063444636, -5.757541644814119]
      dataLayer = dataLayer.createLayerFromBoundingBox(bbox, function (err, layer) {
        expect(err).to.be.a('null')
        expect(layer).to.have.property('type', 'FeatureCollection')
        expect(layer).to.have.property('features')
        expect(layer.features.length).to.be.at.least(1, 'should obtain at least 1 cadastral parcel')
        expect(layer.features[0]).to.have.property('type', 'Feature')
        expect(layer.features[0]).to.have.property('geometry')
        expect(layer.features[0].geometry).to.have.property('type', 'polygon')
        expect(layer.features[0].geometry).to.have.property('coordinates')
        expect(layer.features[0].geometry.coordinates.length).to.be.at.least(1, 'should obtain at least 1 LinearRing coordinate array')
        expect(layer.features[0].geometry.coordinates[0].length).to.be.at.least(4, 'LinearRing is closed LineString with 4 or more positions')
        expect(layer.features[0].geometry.coordinates[0][0]).to.eql(dataLayer.features[0].geometry.coordinates[0][dataLayer.features[0].geometry.coordinates[0].length - 1])
      })
    })

    it('should obtain bbox envelope for Feature cadastral parcel in bounding box', function () {
      var dataLayer = require('../src/dataLayer')
      var bbox = [40.43917746743397, -5.757829017646071, 40.439409063444636, -5.757541644814119]
      dataLayer.createLayerFromBoundingBox(bbox, function (err, layer) {
        expect(err).to.be.a('null')
        expect(layer.features[0]).to.have.property('bbox')
        expect(layer.features[0].bbox).to.have.property('type', 'envelope')
        expect(layer.features[0].bbox).to.have.property('coordinates')
        expect(layer.features[0].bbox.coordinates[0].length).to.equal(2, 'bbox envelope should have 2 coordinates')
        expect(layer.features[0].bbox.coordinates[0][0]).to.be.a('number')
        expect(layer.features[0].bbox.coordinates[0][1]).to.be.a('number')
        expect(layer.features[0].bbox.coordinates[1][0]).to.be.a('number')
        expect(layer.features[0].bbox.coordinates[1][1]).to.be.a('number')
      })
    })

    it('should obtain Feature cadastral parcel properties in bounding box', function () {
      var dataLayer = require('../src/dataLayer')
      var bbox = [40.43917746743397, -5.757829017646071, 40.439409063444636, -5.757541644814119]
      dataLayer.createLayerFromBoundingBox(bbox, function (err, layer) {
        expect(err).to.be.a('null')
        expect(layer.features[0]).to.have.property('properties')
        expect(layer.features[0].properties).to.have.property('nationalCadastralReference', '37284A01500178')
        expect(layer.features[0].properties).to.have.property('elevation')
        expect(layer.features[0].properties).to.have.property('reference_point')
        expect(layer.features[0].properties).to.have.property('label')
        expect(layer.features[0].properties).to.have.property('beginLifespanVersion')
        expect(layer.features[0].properties).to.have.property('endLifespanVersion')
        expect(layer.features[0].properties).to.have.property('areaValue')
        expect(layer.features[0].properties).to.have.property('cadastralData')
      })
    })
  })
})
