'use strict';

var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      initialZoom: 12,
      mapCenterLat: 47.547487,
      mapCenterLng: -122.386976
    };
  },

  componentDidMount: function(rootNode) {
    var mapOptions = { center: this.mapCenterLatLng(), zoom: this.props.initialZoom };
    var map = new google.maps.Map(this.getDOMNode(), mapOptions);
    var marker = new google.maps.Marker({
      position: this.mapCenterLatLng(),
      title: 'Harry\'s Chicken Joint',
      map: map
    });

    this.setState({map: map});
  },

  mapCenterLatLng: function () {
    return new google.maps.LatLng(this.props.mapCenterLat, this.props.mapCenterLng);
  },

  render: function () {
    return (
      <section className='map'></section>
    );
  }
});
