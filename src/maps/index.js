var page = require('page')
// var empty = require('empty-element')
// var template = require('./template')
var settingsPane = require('../settingsPane')
var map = require('../map')
var omnibox = require('../omnibox')
var signin = require('../signinButton')

page('/', settingsPane, function (ctx, next) {
  var main = document.getElementById('main-container')
  map.addMap(main)
  main.appendChild(omnibox)
  main.appendChild(signin)
})