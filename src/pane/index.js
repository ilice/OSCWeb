var yo = require('yo-yo')
var empty = require('empty-element')
var translate = require('../translate')
var omnibox = require('../omnibox')
const dataLayer = require('../dataLayer')

var el = yo `<section id="pane"></section>`
bindTo(omnibox)

document.body.appendChild(el)

function show (dataFeature) {
  if (dataFeature) {
    if (dataFeature.getGeometry().getType() !== 'Point') {
      dataFeature = dataLayer.wrapParcelData(dataFeature)
      var widgetPane = yo`<div class="widget-pane"></div>`
      empty(el).appendChild(widgetPane)

      var sectionHeroHeader = yo`<section class="section-hero-header"></section>`
      widgetPane.appendChild(sectionHeroHeader)

      var imageButton = yo`<button class="button"><img src=""/ class="section-hero-header-button-image"/></button>`
      sectionHeroHeader.appendChild(imageButton)

      omnibox.input.value = dataFeature.nationalCadastralReference
      var sectionHeroHeaderDescription =
        yo`<div class="section-hero-header-description">
          <div class="section-hero-header-title">
            <h1>${dataFeature.nationalCadastralReference}</h1>
          </div>
          <div class="section-hero-header-description-container">
            <div>${dataFeature.address}</div>
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

      var sectionInfo = yo`<div class="section-info"></div>`
      widgetPane.appendChild(sectionInfo)

      appendSectionInfo(sectionInfo, 'photo_size_select_small', 'area', {squareMeters: dataFeature.areaValue})
      appendSectionInfo(sectionInfo, 'filter_hdr', 'altitude', {meters: dataFeature.elevation})
      appendSectionInfo(sectionInfo, 'store', 'construction-units', {units: dataFeature.constructionUnits})
      appendSectionInfo(sectionInfo, 'mode_edit', 'suggest-an-edit')
      appendSectionInfo(sectionInfo, 'verified_user', 'claim-plot')
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

function appendSectionInfo (container, infoType, value, opts) {
  var sectionInfo = yo`<div class="section-info-line">
      <i class="material-icons">${infoType}</i> ${translate.message(value, opts)}
  </div>`
  container.appendChild(sectionInfo)
}

module.exports = {
  show: show,
  close: close,
  bindTo: bindTo
}
