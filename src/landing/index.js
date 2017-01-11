var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var header = require('../header')

page('/', header, function(ctx, next) {
    var main = document.getElementById('main-container');
    main.appendChild(template);
});
