var yo = require('yo-yo')

var icon = document.getElementById('status')

if (!icon) {
  document.body.appendChild(yo`<div id='status' class="status-container">
  <img src='public/OpenSmartCountry_gif_animado.gif' alt="Open Smart Country logo"></div>`)
  icon = document.getElementById('status')
}

module.exports = {
  icon: icon,
  loading: function () {
    return document.getElementById('status').classList.add('loading')
  },
  loaded: function () {
    return document.getElementById('status').classList.remove('loading')
  }
}
