var yo = require('yo-yo');
var empty = require('empty-element');
require('hammerjs');

var el = yo`<header class="header">
    <figure>
        <a class="icon-logo" href="/"><i class="icon-osc-bold"></i></a>
    </figure>
    <nav id="menu" class="menu">
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="#contact">Contacto</a>
            </li>
            <li>
                <a class="go-to-osc" href="mapaDeParcelas.html">Ir a Open Smart Country</a>
            </li>
        </ul>
    </nav>
    <span id="burguer-button" class="icon-menu burguer-button"></span>
</header>`;

module.exports = function header (ctx, next) {
  var container = document.getElementById('header-container');
  empty(container).appendChild(el);

  var $burguerButton = document.getElementById("burguer-button");
  var $menu = document.getElementById("menu");
  $burguerButton.addEventListener('click', toggleMenu);

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

  next();
};
