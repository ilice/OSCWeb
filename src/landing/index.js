var page = require('page')
var empty = require('empty-element')
var template = require('./template')
var header = require('../header')
var footer = require('../footer')

page('/', header, footer, function(ctx, next) {
    var main = document.getElementById('main-container')
    empty(main).appendChild(template)
})
