var page = require('page')
var webFont = require('webfontloader')

require('./landing')
require('./map')

page()

// Async font
webFont.load({
  google: {
    families: ['Open+Sans:300,400,600:latin', 'Material+Icons']
  }
})
