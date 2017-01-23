var yo = require('yo-yo')
var translate = require('../translate')
var geocode = require('../map').geocode
var autocomplete = require('../map').autocomplete

var input = yo`<input id='address' type="text" placeholder=${translate.message('search-osc')} onclick=${addAutocomplete}/>`

function addAutocomplete () {
  if (!input.classList.contains('autocomplete')) {
    autocomplete(input)
    input.classList.add('autocomplete')
  }
}

input.addEventListener('keyup', (event) => { event.key === 'Enter' ? geocodeAddress() : null }, false)

var el = yo`<div class='omnibox'>
  <i id="omnibox-burguer-button" onclick=${toggleMenu} class="material-icons">menu</i>
  ${input}
  <i class="material-icons flex-end" onclick=${geocodeAddress}>search</i>
</div>`

function toggleMenu () {
  var $menu = document.getElementById('menu')
  $menu.classList.toggle('active')
}

function geocodeAddress () {
  geocode(input.value)
  input.blur()
}

module.exports = el
