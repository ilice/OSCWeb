var expect = require('chai').expect

describe('Status', function () {
  describe('#Add status icon', function () {
    it('should create a status icon with no status', function () {
      require('../src/status')
      var icon = document.getElementById('status')
      expect(icon).to.not.equal(null)
      expect(icon).to.be.a('Object')
      expect(icon.tagName).to.equal('DIV')
      expect(icon.classList).to.match(/^status-container/)
    })
  })

  describe('#Set loading status', function () {
    it('should add loading property', function () {
      var status = require('../src/status')
      document.body.appendChild(status.icon)
      expect(status.icon).to.not.match(/^loading/)
      status.loading()
      expect(status.icon.classList.contains('loading')).to.be.true
    })
  })

  describe('#Set loaded status', function () {
    it('should remove loading property', function () {
      var status = require('../src/status')
      document.body.appendChild(status.icon)
      expect(status.icon).to.not.match(/^loading/)
      status.loading()
      expect(status.icon.classList.contains('loading')).to.be.true
      status.loaded()
      expect(status.icon.classList.contains('loading')).to.be.false
    })
  })
})
