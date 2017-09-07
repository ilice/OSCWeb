var expect = require('chai').expect
describe('Pane', function () {
  describe('# Show pane', function () {
    it('should show a lateral pane when requested (click on data feature)', function () {
      const pane = require('../src/pane')
      expect(pane.show).to.be.a('function')
      pane.show()
      expect(document.getElementById('pane')).not.to.be.null
    })
  })

  describe('# Close pane', function () {
    it('should empty lateral pane when requested (click on map or click on close button)', function () {
      const pane = require('../src/pane')
      expect(pane.close).to.be.a('function')
      pane.close()
      expect(document.getElementById('pane').hasChildNodes()).to.be.false
    })
  })

  describe('# Show feature in pane', function () {
    const pane = require('../src/pane')
    
    const parcelFeature = require('./fixtures').getGoogleMapsParcelFeature()

    it('should have a hero header section with an image button', function () {
      pane.show(parcelFeature)
      var sectionsHeroHeader = document.getElementById('pane').getElementsByClassName('section-hero-header')
      expect(sectionsHeroHeader).to.not.be.null
      expect(sectionsHeroHeader.length).to.be.equal(1, '1 and only 1 section hero header')
      var sectionHeroHeader = sectionsHeroHeader[0]
      expect(sectionHeroHeader.getElementsByTagName('button')).to.not.be.null
      expect(sectionHeroHeader.getElementsByTagName('button').length).to.be.least(1, 'Almost a button in section-hero-header')
      var imageButton = sectionHeroHeader.getElementsByTagName('button')[0]
      expect(imageButton.getElementsByTagName('img')).to.not.be.null
      expect(imageButton.getElementsByTagName('img').length).to.be.least(1, 'Almost an image in the button of section-hero-header')
    })

    it('and with a description in the hero header section', function () {
      pane.show(parcelFeature)
      var sectionHeroHeader = document.getElementById('pane').getElementsByClassName('section-hero-header')[0]
      expect(sectionHeroHeader.getElementsByClassName('section-hero-header-description')).to.not.be.null
      expect(sectionHeroHeader.getElementsByClassName('section-hero-header-description').length).to.be.least(1, 'Almost a description in section-hero-header')
      var description = sectionHeroHeader.getElementsByClassName('section-hero-header-description')[0]
      expect(description.getElementsByClassName('section-hero-header-title')).to.not.be.null
      expect(description.getElementsByClassName('section-hero-header-title').length).to.be.least(1, 'Almost a title in section-hero-header')
      expect(description.getElementsByTagName('h1').length).to.be.least(1, 'Almost a title in section-hero-header')
      expect(description.getElementsByTagName('h1')[0].textContent).to.be.equal(parcelFeature.properties.nationalCadastralReference, 'Title with the national cadastral reference of the selected parcel')
      expect(description.getElementsByClassName('section-hero-header-container')).to.not.be.null
      expect(description.getElementsByClassName('section-hero-header-description-container').length).to.be.least(1, 'Almost a description container in section-hero-header')
    })

    it('should have an action section', function () {
      pane.show(parcelFeature)
      var sectionsAction = document.getElementById('pane').getElementsByClassName('section-action')
      expect(sectionsAction).to.not.be.null
      expect(sectionsAction.length).to.be.equal(1, '1 and only 1 action section')
      var sectionAction = sectionsAction[0]
      var buttons = sectionAction.getElementsByTagName('button')
      expect(buttons).to.not.be.null
      expect(buttons.length).to.be.equal(4, 'Four action buttons in the action section')
    })
  })
})
