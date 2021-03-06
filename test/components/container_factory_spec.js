import ContainerFactory from '../../src/components/container_factory'

import $ from 'clappr-zepto'

describe('ContainerFactory', function() {
  beforeEach(function() {
    this.options = {
      source: 'http://some.url/for/video.mp4',
      autoPlay: false
    }
    this.playback = {canPlay: () => true}
    this.loader = {playbackPlugins: [this.playback]}
    this.i18n = {}
    this.containerFactory = new ContainerFactory(this.options, this.loader, this.i18n)
  })

  it('finds playback based on source', function() {
    const playback = this.containerFactory.findPlaybackPlugin('video.mp4')
    assert.equal(this.playback, playback)
  })

  it('allows overriding options', function() {
    expect(this.containerFactory.options.source).to.be.equal(this.options.source)
    expect(this.containerFactory.options.autoPlay).to.be.equal(this.options.autoPlay)
    const newSource = 'http://some.url/for/video.m3u8'
    this.containerFactory.options = $.extend({}, this.options, {source: newSource})
    expect(this.containerFactory.options.source).to.be.equal(newSource)
  })
})
