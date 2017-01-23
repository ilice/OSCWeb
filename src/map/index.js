var empty = require('empty-element')
var template = require('./template')

module.exports = {
  addMap: function (mapContainer) {
    empty(mapContainer).appendChild(template.map)
  },
  geocode: template.geocode,
  autocomplete: template.autocomplete,
  bindTo: template.bindTo
}
