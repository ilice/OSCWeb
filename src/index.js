var page = require('page');
var yo = require('yo-yo');
var webFont = require('webfontloader');

page('/', function(ctx, next){

  var main = document.getElementById('main-container');


  var el = yo`<div><section class="landing flex-container landing-background">
      <div>
          <i class="icon-osc-bold logo"></i>
          <h1 class="title">Tu parcela útil y sostenible</h1>
          <div>
              <button class="button recomended-min-button-size" onclick="location.href='/propietario'">Ir a Open Smart Country</button>
          </div>
          <div class="arrow-hint">
              <a href="#start">
                  <div class="icon-down animated-arrow-1"></div>
                  <div class="icon-down animated-arrow-2"> </div>
              </a>
          </div>
      </div>
  </section>
  <div id="start" class="content-wrapper">

      <section class="section section-profile">


          <div class="column">
              <div class="icon-row">
                  <i class="material-icons md-70 blue600">add_location</i>
                  <i class="material-icons md-70 green600">edit_location</i>
                  <i class="material-icons md-70 yelow600">pin_drop</i>
              </div>
              <div class="icon-row">
                  <i class="material-icons md-70 yelow600">map</i>
                  <i class="material-icons md-70 magenta600">beenhere</i>
                  <i class="material-icons md-70 blue600">place</i>
              </div>
              <div class="icon-row">
                  <i class="material-icons md-70 red600">satellite</i>
                  <i class="material-icons md-70 blue600">layers</i>
                  <i class="material-icons md-70 green600">local_florist</i>
              </div>
          </div>


          <div class="column">
              <div>
                  <h2>Pon tu parcela online</h2>
                  <p>
                      OSC te ofrece un perfil de tu parcela gratuito. Pon tu parcela online, hoy si algo no está en internet no existe. Añade información de interés y comparte en tus redes sociales.
                  </p>
              </div>
          </div>
      </section>

      <div class="photo-wrapper">
          <div class="everywhere-photo"></div>
      </div>


      <section class="section section-everywhere">


          <div class="column">
              <div>
                  <h2>La información de tu parcela desde cualquier lugar</h2>
                  <p>
                      Puedes acceder a la información de tu parcela desde cualquier smartphone, tablet u ordenador. Estés dondes estés tu información estará contigo.
                  </p>
              </div>
          </div>


          <div class="column">
              <div>
                  <i class="material-icons">devices</i>
              </div>
          </div>


      </section>

      <div class="photo-wrapper">
          <div class="share-photo"></div>
      </div>


      <section class="section section-share">


          <div>

              <div class="share-icons">
                  <i class="icon-facebook"></i>
                  <i class="icon-twitter"></i>
                  <i class="icon-envelope"></i>
                  <i class="icon-whatsapp"></i>
                  <i class="icon-file-pdf"></i>

                  <i class="material-icons">share</i>
              </div>





              <div>
                  <h2>Comparte la información de tu parcela</h2>
                  <p>
                      Puedes enviar fácilmente a otros usuarios la información de tu parcela, también puedes descargar un informe para enviar cómodamente o para incluir junto a otro tipo de información.
                  </p>
              </div>
          </div>

      </section>

      <div class="photo-wrapper">
          <div class="final-photo"></div>
      </div>


      <section class="section section-final">
          <div>
              <i class="icon-osc-bold logo"></i>
              <h1>Empieza a usar Open Smart Country gratis</h1>
              <div>
                  <button class="button recomended-min-button-size" onclick="location.href='/propietario'">Ir a Open Smart Country</button>
              </div>
          </div>
      </section>

  </div>
  </div>`;

  //main.innerHTML = el;
});

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
