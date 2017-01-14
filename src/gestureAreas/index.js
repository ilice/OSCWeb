var yo = require('yo-yo')

var leftHitArea = yo `<div id="left-hit-area" class="left-hit-area"></div>`

module.exports = function enableGestureAreas (ctx, next) {
  var $body = document.body
  $body.appendChild(leftHitArea)

  next()
}
