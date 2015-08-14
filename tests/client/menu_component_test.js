'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var shallowRenderer = TestUtils.createRenderer();
var MenuComponent = require('./test_build/js/components/menu.js');
var expect = require('chai').expect;

describe('menu component test', function() {
  shallowRenderer.render(React.createElement(MenuComponent, {
    menu: [
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
        category: 'sides',
        index: 1
      },
      {
        _id: 3,
        restaurant: 'chicken',
        title: 'test dish 3',
        price: '3',
        description: 'test 3',
        category: 'sauces',
        index: 1
      },
      {
        _id: 4,
        restaurant: 'chicken',
        title: 'test dish 4',
        price: '4',
        description: 'test 4',
        category: 'drinks',
        index: 1
      }
    ]
  }));

  var component = shallowRenderer.getRenderOutput();
  var section = component.props.children;
  var clearHeader = section.props.children[0];
  var header = section.props.children[1];
  var menuList = section.props.children[2];
  var menuItems = menuList.props.children;

  it('should render a menu component', function() {
    expect(component.type).to.eql('article');
    expect(component.props.className).to.eql('slab menu');
    expect(section.type).to.eql('section');
    expect(section.props.className).to.eql('content menu');
    expect(clearHeader.type).to.eql('span');
    expect(clearHeader.props.className).to.eql('clear-header');
    expect(header.type).to.eql('h3');
    expect(header.props.children).to.eql('Our Menu');
    expect(menuList.type).to.eql('ul');
    expect(menuItems.length).to.eql(4);
  });

  it('should render an entrees category', function() {
    var entreeCategory = menuItems[0];
    var title = entreeCategory.props.children[0];
    var dishes = entreeCategory.props.children[1].props.categoryDishes;

    expect(entreeCategory.type).to.eql('li');
    expect(entreeCategory.props.className).to.eql('entrees category');
    expect(entreeCategory.props.children[0]);
    expect(title.type).to.eql('p');
    expect(title.props.className).to.eql('category-title');
    expect(title.props.children).to.eql('Entrees');
    expect(dishes[0]._id).to.eql(1);
    expect(dishes[0].restaurant).to.eql('chicken');
    expect(dishes[0].title).to.eql('test dish 1');
    expect(dishes[0].price).to.eql('1');
    expect(dishes[0].description).to.eql('test 1');
    expect(dishes[0].category).to.eql('entrees');
    expect(dishes[0].index).to.eql(1);
  });

  it('should render a sides category', function() {
    var sideCategory = menuItems[1];
    var title = sideCategory.props.children[0];
    var dishes = sideCategory.props.children[1].props.categoryDishes;

    expect(sideCategory.type).to.eql('li');
    expect(sideCategory.props.className).to.eql('sides category');
    expect(sideCategory.props.children[0]);
    expect(title.type).to.eql('p');
    expect(title.props.className).to.eql('category-title');
    expect(title.props.children).to.eql('Sides');
    expect(dishes[0]._id).to.eql(2);
    expect(dishes[0].restaurant).to.eql('chicken');
    expect(dishes[0].title).to.eql('test dish 2');
    expect(dishes[0].price).to.eql('2');
    expect(dishes[0].description).to.eql('test 2');
    expect(dishes[0].category).to.eql('sides');
    expect(dishes[0].index).to.eql(1);
  });

  it('should render a sauces category', function() {
    var sauceCategory = menuItems[2];
    var title = sauceCategory.props.children[0];
    var dishes = sauceCategory.props.children[1].props.categoryDishes;

    expect(sauceCategory.type).to.eql('li');
    expect(sauceCategory.props.className).to.eql('sauces category');
    expect(sauceCategory.props.children[0]);
    expect(title.type).to.eql('p');
    expect(title.props.className).to.eql('category-title');
    expect(title.props.children).to.eql('Sauces');
    expect(dishes[0]._id).to.eql(3);
    expect(dishes[0].restaurant).to.eql('chicken');
    expect(dishes[0].title).to.eql('test dish 3');
    expect(dishes[0].price).to.eql('3');
    expect(dishes[0].description).to.eql('test 3');
    expect(dishes[0].category).to.eql('sauces');
    expect(dishes[0].index).to.eql(1);
  });


  it('should render a drinks category', function() {
    var drinkCategory = menuItems[3];
    var title = drinkCategory.props.children[0];
    var dishes = drinkCategory.props.children[1].props.categoryDishes;

    expect(drinkCategory.type).to.eql('li');
    expect(drinkCategory.props.className).to.eql('drinks category');
    expect(drinkCategory.props.children[0]);
    expect(title.type).to.eql('p');
    expect(title.props.className).to.eql('category-title');
    expect(title.props.children).to.eql('Drinks');
    expect(dishes[0]._id).to.eql(4);
    expect(dishes[0].restaurant).to.eql('chicken');
    expect(dishes[0].title).to.eql('test dish 4');
    expect(dishes[0].price).to.eql('4');
    expect(dishes[0].description).to.eql('test 4');
    expect(dishes[0].category).to.eql('drinks');
    expect(dishes[0].index).to.eql(1);
  });
});
