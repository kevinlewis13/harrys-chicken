'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var shallowRenderer = TestUtils.createRenderer();
var HeaderComponent = require('./test_build/js/components/header.js');
var expect = require('chai').expect;

describe('header component test', function() {
  shallowRenderer.render(React.createElement(HeaderComponent, {
    headerInfo: {
      name: 'Test Restaurant',
      phone: '123.456.7890',
    }
  }));

  var component = shallowRenderer.getRenderOutput();
  var header = component.props.children;
  var nav = header.props.children[1];

  it('should render a header component', function() {
    var headerTitle = header.props.children[0];
    var name = headerTitle.props.children;

    expect(component.type).to.eql('div');
    expect(component.props.className).to.eql('header-container');
    expect(header.type).to.eql('header');
    expect(header.props.className).to.eql('content header');
    expect(headerTitle.type).to.eql('a');
    expect(name.type).to.eql('h1');
    expect(name.props.children).to.eql('Test Restaurant');
    expect(nav.type).to.eql('nav');
    expect(nav.props.className).to.eql('nav');
  });

  it('should render nav links', function() {
    var locationLink = nav.props.children[0];
    var menuLink = nav.props.children[1];
    var aboutLink = nav.props.children[2];
    var phoneLink = nav.props.children[3];

    expect(locationLink.type).to.eql('a');
    expect(locationLink.props.children).to.eql('Location');
    expect(menuLink.type).to.eql('a');
    expect(menuLink.props.children).to.eql('Menu');
    expect(aboutLink.type).to.eql('a');
    expect(aboutLink.props.children).to.eql('About');
    expect(phoneLink.type).to.eql('a');
    expect(phoneLink.props.className).to.eql('button');
    expect(phoneLink.props.href).to.eql('tel:+1234567890');
    expect(phoneLink.props.children).to.eql('123.456.7890');
  });
});
