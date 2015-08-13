'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var shallowRenderer = TestUtils.createRenderer();
var DishComponent = require('./test_build/js/components/dish.js');
var expect = require('chai').expect;

describe('dish component test', function() {
  shallowRenderer.render(React.createElement(DishComponent, {
    dish: {
      _id: 1,
      restaurant: 'chicken',
      title: 'test dish',
      price: '1',
      description: 'test',
      category: 'entree',
      index: 1
    },
  }));

  it('should render a dish component', function() {
    var component = shallowRenderer.getRenderOutput();
    var dishTitle = component.props.children[0];
    var dishPrice = component.props.children[1];
    var dishDescription = component.props.children[2];

    expect(component.type).to.eql('li');
    expect(component).to.not.eql(null);
    expect(dishTitle.type).to.eql('p');
    expect(dishTitle.props.className).to.eql('title');
    expect(dishTitle.props.children).to.eql('test dish');
    expect(dishPrice.type).to.eql('p');
    expect(dishPrice.props.className).to.eql('price');
    expect(dishPrice.props.children).to.eql('1');
    expect(dishDescription.type).to.eql('p');
    expect(dishDescription.props.className).to.eql('description');
    expect(dishDescription.props.children).to.eql('test');
  });
});
