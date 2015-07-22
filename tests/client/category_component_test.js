'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var shallowRenderer = TestUtils.createRenderer();
var CategoryComponent = require('./test_build/js/components/category.js');
var expect = require('chai').expect;

describe('simple component test', function() {
  shallowRenderer.render(React.createElement(CategoryComponent));
  var component = shallowRenderer.getRenderOutput();

  it('should render a component', function() {
    expect(component.type).to.eql('ul');
    expect(component).to.not.eql(null);
  });
});
