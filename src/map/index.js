var empty = require('empty-element')
var template = require('./template')

module.exports = {
  addMap: function (mapContainer) {
    empty(mapContainer).appendChild(template.map)
  },
  refreshMap: function () {
    // template.draw()
  },
  geocode: template.geocode,
  autocomplete: template.autocomplete
}
