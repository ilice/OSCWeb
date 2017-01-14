var yo = require('yo-yo')
var empty = require('empty-element')
var translate = require('../translate')
require('hammerjs')

var el = yo `<header id="settingsPane" class="header settingsPane">
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

</header>`

module.exports = function settingsPane (ctx, next) {
  var container = document.getElementById('header-container')
  empty(container).appendChild(el)

  var $menu = document.getElementById('menu')

  function hideMenu () {
    $menu.classList.remove('active')
  }

  function showMenu () {
    $menu.classList.add('active')
  }

  $menu.addEventListener('click', hideMenu)

  // Gestures recognition
  var $settingsPane = document.getElementById('settingsPane')
  var $settingsPaneGestures = new Hammer($settingsPane)
  $settingsPaneGestures.on('swipeleft', hideMenu)

  var $leftHitArea = document.getElementById('left-hit-area')
  var $leftHitAreaGestures = new Hammer($leftHitArea)
  $leftHitAreaGestures.on('swiperight', showMenu)

  next()
}
