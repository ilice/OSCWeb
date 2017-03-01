var yo = require('yo-yo')

var icon = document.getElementById('status')

if (!icon) {
  document.body.appendChild(yo`<div id='status' class="status-container">
  <img src='public/OpenSmartCountry_gif_animado.gif' alt="Open Smart Country logo"></div>`)
  icon = document.getElementById('status')
  icon.addEventListener('click', loaded)
}

function loading () {
  return document.getElementById('status').classList.add('loading')
}

function loaded () {
  return document.getElementById('status').classList.remove('loading')
}

module.exports = {
  icon: icon,
  loading: loading,
  loaded: loaded
}
