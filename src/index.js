var page = require('page')
var yo = require('yo-yo')
var webFont = require('webfontloader')
var empty = require('empty-element')

require('./landing')

page()

//Async font
webFont.load({
    google: {
        families: ['Open+Sans:300,400,600:latin', 'Material+Icons']
    }
})
