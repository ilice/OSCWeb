var yo = require('yo-yo')

var el = yo`<div class='omnibox'>
  <i id="omnibox-burguer-button" onclick=${toggleMenu} class="material-icons">menu</i> <input type="text" placeholder="Buscar en Open Smart Country"/> <i class="material-icons flex-end">search</i>
</div>`

function toggleMenu () {
  var $menu = document.getElementById('menu')
  $menu.classList.toggle('active')
}

module.exports = el
