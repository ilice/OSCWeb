var yo = require('yo-yo')
var empty = require('empty-element')
var translate = require('../translate')
var omnibox = require('../omnibox')

var el = yo `<section id="pane"></section>`
bindTo(omnibox)

document.body.appendChild(el)

function show (feature) {
  if (feature) {
    if (feature.getGeometry().getType() !== 'Point') {
      var widgetPane = yo`<div class="widget-pane"></section></div>`
      empty(el).appendChild(widgetPane)

      var sectionHeroHeader = yo`<section class="section-hero-header"></section>`
      widgetPane.appendChild(sectionHeroHeader)

      var imageButton = yo`<button class="button"><img src=""/ class="section-hero-header-button-image"/></button>`
      sectionHeroHeader.appendChild(imageButton)

      omnibox.input.value = feature.getProperty('nationalCadastralReference')
      var sectionHeroHeaderDescription =
        yo`<div class="section-hero-header-description">
          <div class="section-hero-header-title">
            <h1>${feature.getProperty('nationalCadastralReference')}</h1>
          </div>
          <div class="section-hero-header-description-container">
          </div>
        </div>`
      sectionHeroHeader.appendChild(sectionHeroHeaderDescription)

      var sectionAction = yo`<div class="section-action">
        <div class="section-entity-action">
          <button class="button">
            <i class="material-icons blue600 md-24 inverted">star_rate</i>
            <div>${translate.message('save')}</div>
          </button>
          <button class="button">
            <i class="material-icons blue600 md-24 inverted">place</i>
            <div>${translate.message('nearby-plots')}</div>
          </button>
          <button class="button">
            <i class="material-icons blue600 md-24 inverted">play_for_work</i>
            <div>${translate.message('download')}</div>
          </button>
          <button class="button">
            <i class="material-icons blue600 md-24 inverted">share</i>
            <div>${translate.message('share')}</div>
          </button>
        </div>
      </div>`
      widgetPane.appendChild(sectionAction)
    }
  }
}

function bindTo (omnibox) {
  omnibox.searchButton.addEventListener('click', function () {
    close()
  })

  omnibox.burguerButton.addEventListener('click', function () {
    close()
  })

  omnibox.input.addEventListener('keyup', (event) => { event.key === 'Enter' ? (close()) : null }, false)
}

function close () {
  empty(el)
}

module.exports = {
  show: show,
  close: close,
  bindTo: bindTo
}
