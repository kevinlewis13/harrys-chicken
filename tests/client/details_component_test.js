'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var shallowRenderer = TestUtils.createRenderer();
var DetailsComponent = require('./test_build/js/components/details.js');
var expect = require('chai').expect;

describe('details component test', function() {
  shallowRenderer.render(React.createElement(DetailsComponent, {
    restaurantInfo: {
      phone: '123.456.7890',
      address: '511 Boren Ave N.\nSeattle, WA 98109',
      hours: 'Monday - Friday, 9am-5pm'
    }
  }));

  var component = shallowRenderer.getRenderOutput();

  it('should render a details component', function() {
    var deetsHeader = component.props.children[0];

    expect(component.type).to.eql('section');
    expect(component.props.className).to.eql('details large-4 large-offset-2 medium-12 small-12 columns');
    expect(deetsHeader.type).to.eql('h3');
    expect(deetsHeader.props.children).to.eql('Our Deets');
  });

  it('should render phone details', function() {
    var phoneHeader = component.props.children[1];
    var phone = component.props.children[2];

    expect(phoneHeader.type).to.eql('h4');
    expect(phoneHeader.props.children).to.eql('Phone');
    expect(phone.type).to.eql('p');
    expect(phone.props.children).to.eql('123.456.7890');
  });

  it('should render address details', function() {
    var addressHeader = component.props.children[3];
    var address = component.props.children[4];
    var numberAndStreet = address.props.children[0];
    var br = address.props.children[1];
    var cityAndState = address.props.children[2];

    expect(addressHeader.type).to.eql('h4');
    expect(addressHeader.props.children).to.eql('Address');
    expect(address.type).to.eql('p');
    expect(numberAndStreet).to.eql('511 Boren Ave N.');
    expect(br.type).to.eql('br');
    expect(cityAndState).to.eql('Seattle, WA 98109');
  });

  it('shoulr render hours details', function() {
    var hoursHeader = component.props.children[5];
    var hours = component.props.children[6];

    expect(hoursHeader.type).to.eql('h4');
    expect(hoursHeader.props.children).to.eql('Hours');
    expect(hours.type).to.eql('p');
    expect(hours.props.children).to.eql('Monday - Friday, 9am-5pm');
  });
});
