var expect = require('chai').expect

describe('Omnibox', function () {
  var omnibox = require('../src/omnibox')
  var input = omnibox.input
  var searchButton = omnibox.searchButton

  it('Omnibox has an omnibox container element', function () {
    expect(omnibox.container).to.not.equal(null)
    expect(omnibox.container.tagName).to.equal('DIV')
  })

  it('Omnibox has a bindable text input field', function () {
    expect(input.tagName).to.equal('INPUT')
    expect(input.getAttribute('type')).to.equal('text')
  })

  it('Omnibox has a bindable icon to search', function () {
    expect(searchButton.tagName).to.equal('I')
  })
})
