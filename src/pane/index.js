var yo = require('yo-yo')
var empty = require('empty-element')

var el = yo `<section id="pane"></section>`

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
            <div>GUARDAR</GUARDAR>
          </button>
          <button class="button">
            <i class="material-icons blue600 md-24 inverted">place</i>
            <div>PARCELAS CERCANAS</GUARDAR>
          </button>
          <button class="button">
            <i class="material-icons blue600 md-24 inverted">play_for_work</i>
            <div>DESCARGAR INFORME</GUARDAR>
          </button>
          <button class="button">
            <i class="material-icons blue600 md-24 inverted">share</i>
            <div>COMPARTIR</GUARDAR>
          </button>
        </div>
      </div>`
      widgetPane.appendChild(sectionAction)
    }
  }
}

function close () {
  empty(el)
}

module.exports = {
  show: show,
  close: close
}
