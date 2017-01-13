var yo = require('yo-yo')
var empty = require('empty-element')
var translate = require('../translate')

var el = yo `<header class="header settingsPane">
    <nav id="menu" class="menu">
        <ul>
            <li>
              <figure>
                  <a class="icon-logo" href="/"><i class="icon-osc-bold"></i></a>
              </figure>
            </li>
            <li>
                <a href="/osc">${translate.message('meet-open-smart-country')}</a>
            </li>
            <li>
                <a class="go-to-osc" href="/">${translate.message('go-to-osc')}</a>
            </li>
        </ul>
    </nav>
    <span id="burguer-button" class="icon-menu burguer-button"></span>
</header>`

module.exports = function settingsPane (ctx, next) {
  var container = document.getElementById('header-container')
  empty(container).appendChild(el)

  var $menu = document.getElementById('menu')

  function hideMenu () {
    $menu.classList.remove('active')
  }

  $menu.addEventListener('click', hideMenu)

  next()
}
