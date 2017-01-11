var yo = require('yo-yo');
var empty = require('empty-element');

var el = yo `<footer>
        <a class="icon-logo" href="/"><i class="icon-osc-bold"></i></a>
        <div id="contact" class="contact">
          <a href="tel:+34615401486"><i class="material-icons">phone</i> +34 615 401 486</a>
          <a href="mailto:info@opensmarcountry.com"><i class="material-icons">email</i> info@opensmartcountry.com</a>
        </div>
    </footer>`;

module.exports = function footer(ctx, next) {
    var container = document.getElementById('footer-container');
    empty(container).appendChild(el);
    next();
};
