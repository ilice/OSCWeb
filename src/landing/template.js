var yo = require('yo-yo')
var translate = require('../translate')

function goToOSC () {
  location.href = '/'
}

module.exports = yo`<div>
  <section class="landing flex-container landing-background">
    <div>
        <i class="icon-osc-bold logo"></i>
        <h1 class="title">${translate.message('landing-claim')}</h1>
        <div>
            <button class="button recomended-min-button-size" onclick=${goToOSC}>${translate.message('go-to-osc')}</button>
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
          <h2>${translate.message('upload-your-plot')}</h2>
          <p>
            ${translate.message('upload-your-plot-explanation')}
          </p>
        </div>
      </div>
    </section>
    <div class="photo-wrapper">
      <div class="everywhere-photo"></div>
    </div>
    <section class="section section-anywhere">
      <div class="column">
        <div>
          <h2>${translate.message('anywhere-plot')}</h2>
          <p>
              ${translate.message('anywhere-plot-explanation')}
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
          <h2>${translate.message('share-your-plot')}</h2>
          <p>
            ${translate.message('share-your-plot-explanation')}
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
        <h1>${translate.message('get-started')}</h1>
        <div>
          <button class="button recomended-min-button-size" onclick=${goToOSC}>${translate.message('go-to-osc')}</button>
        </div>
      </div>
    </section>
  </div>
</div>`
