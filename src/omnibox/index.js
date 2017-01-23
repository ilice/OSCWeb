var yo = require('yo-yo')
var translate = require('../translate')
var geocode = require('../map').geocode

var el = yo`<div class='omnibox'>
  <i id="omnibox-burguer-button" onclick=${toggleMenu} class="material-icons">menu</i>
  <input id='address' type="text" placeholder=${translate.message('search-osc')}/>
  <i class="material-icons flex-end" onclick=${geocodeAddress}>search</i>
</div>`

function toggleMenu () {
  var $menu = document.getElementById('menu')
  $menu.classList.toggle('active')
}

function geocodeAddress () {
  var $address = document.getElementById('address').value
  geocode($address)
}

module.exports = el
