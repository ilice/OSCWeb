var page = require('page')
var webFont = require('webfontloader')

require('./landing')

page()

// Async font
webFont.load({
  google: {
    families: ['Open+Sans:300,400,600:latin', 'Material+Icons']
  }
})
