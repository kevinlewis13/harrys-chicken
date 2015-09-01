'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var shallowRenderer = TestUtils.createRenderer();
var InfoComponent = require('./test_build/js/components/info.js');
var expect = require('chai').expect;

describe('info component test', function() {
  shallowRenderer.render(React.createElement(InfoComponent));

  it('should render an info component', function() {
    var component = shallowRenderer.getRenderOutput();
    var section = component.props.children;
    var clearHeader = section.props.children[0];

    expect(component.type).to.eql('article');
    expect(component.props.className).to.eql('slab info');
    expect(section.type).to.eql('section');
    expect(section.props.className).to.eql('content info row');
    expect(clearHeader.type).to.eql('span');
    expect(clearHeader.props.className).to.eql('clear-header');
    expect(clearHeader.props.id).to.eql('location');
  });
});
