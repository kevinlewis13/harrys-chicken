'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var shallowRenderer = TestUtils.createRenderer();
var CategoryComponent = require('./test_build/js/components/category.js');
var expect = require('chai').expect;

describe('category component test', function() {
  shallowRenderer.render(React.createElement(CategoryComponent, {
    categoryDishes: [
      {
        _id: 1,
        restaurant: 'chicken',
        title: 'test dish 1',
        price: '1',
        description: 'test 1',
        category: 'entrees',
        index: 1
      },
      {
        _id: 2,
        restaurant: 'chicken',
        title: 'test dish 2',
        price: '2',
        description: 'test 2',
        category: 'entrees',
        index: 2
      }
    ]
  }));

  it('should render a category component', function() {
    var component = shallowRenderer.getRenderOutput();
    var testDish1 = component.props.children[0];
    var testDish2 = component.props.children[1];

    expect(component.type).to.eql('ul');
    expect(component).to.not.eql(null);
    expect(testDish1.props.dish.restaurant).to.eql('chicken');
    expect(testDish1.props.dish.title).to.eql('test dish 1');
    expect(testDish1.props.dish.price).to.eql('1');
    expect(testDish1.props.dish.description).to.eql('test 1');
    expect(testDish1.props.dish.category).to.eql('entrees');
    expect(testDish1.props.dish.index).to.eql(1);
    expect(testDish2.props.dish.restaurant).to.eql('chicken');
    expect(testDish2.props.dish.title).to.eql('test dish 2');
    expect(testDish2.props.dish.price).to.eql('2');
    expect(testDish2.props.dish.description).to.eql('test 2');
    expect(testDish2.props.dish.category).to.eql('entrees');
    expect(testDish2.props.dish.index).to.eql(2);
  });
});
