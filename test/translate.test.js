var assert = require('assert')
var expect = require('chai').expect
var clearRequire = require('clear-require')

describe('Web translator', function (){

  //TODO: These tests do not verify the current behavior. They are loading the
  // library every time, not changing the localStorage data. They only verify
  //that if we have implemented the access to the localStorage correctly then
  //the translation occurs.

  afterEach(function() {
    localStorage.clear()
		localStorage.locale = null
    clearRequire('../src/translate')
  })

  describe('Spanish translation', function(){
    require('intl-messageformat')
    localStorage.setItem('locale','es')
    var translate = require('../src/translate')
    it('Translate home to spanish', function(done){
      var text = translate.message('home')
      expect(text).to.equal('Inicio')
      done()
    })
    it('Translate contact to spanish', function(done){
      var text = translate.message('contact')
      expect(text).to.equal('Contacto')
      done()
    })
    it('Translate go-to-osc to spanish', function(done){
      var text = translate.message('go-to-osc')
      expect(text).to.equal('Ir a Open Smart Country')
      done()
    })
    it('Translate english to spanish', function(done){
      var text = translate.message('english')
      expect(text).to.equal('Inglés')
      done()
    })

  })

  describe('English translation', function(){
    it('Translate home to english', function(done){
      require('intl-messageformat')
      localStorage.setItem('locale','en-US')
      var translate = require('../src/translate')
      var text = translate.message('home')
      expect(text).to.equal('Home')
      done()
    })
  })
})
