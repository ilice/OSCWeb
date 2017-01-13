var empty = require('empty-element')
var template = require('./template')


module.exports = {
  addMap: function (map_container){
    empty(map_container).appendChild(template.map)
  },
  refreshMap: function (){
    //template.draw()
  }
}
