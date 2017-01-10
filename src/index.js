var page = require('page');
var yo = require('yo-yo');
var webFont = require('webfontloader');
var empty = require('empty-element');

require('./landing');

page();

require('hammerjs');

var $burguerButton = document.getElementById("burguer-button");
var $menu = document.getElementById("menu");
$burguerButton.addEventListener('click', toggleMenu);
$menu.addEventListener('click', toggleMenu);

function toggleMenu() {
    $menu.classList.toggle('active');
}

function showMenu() {
    $menu.classList.add('active');
}

function hideMenu() {
    $menu.classList.remove('active');
}

//Gestures recognition
var $body = document.body;

var gestures = new Hammer($body);
gestures.on('swipeleft', hideMenu);
gestures.on('swiperight', showMenu);

//Async font
webFont.load({
    google: {
        families: ['Open+Sans:300,400,600:latin', 'Material+Icons']
    }
});
