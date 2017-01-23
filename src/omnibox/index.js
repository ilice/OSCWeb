var yo = require('yo-yo')
var translate = require('../translate')

var input = yo`<input id='address' type="text" placeholder=${translate.message('search-osc')}/>`
var searchButton = yo`<i id="omnibox-search-button" class="material-icons flex-end">search</i>`

var el = yo`<div class='omnibox'>
  <i id="omnibox-burguer-button" onclick=${toggleMenu} class="material-icons">menu</i>
  ${input}
  ${searchButton}
</div>`

function toggleMenu () {
  var $menu = document.getElementById('menu')
  $menu.classList.toggle('active')
}

module.exports = {
  container: el,
  input: input,
  searchButton: searchButton
}
