'use strict';

var React = require('react');

module.exports = React.createClass({
  map: null,
  marker: null,

  createMap: function() {
    var harrys = new google.maps.LatLng(47.547487, -122.386976);
    var mapProps = {
      center:harrys,
      zoom:10,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    return new google.maps.Map(this.refs.map_canvas.getDOMNode(), mapProps);
  },

  createMarker: function() {
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(47.547487, -122.386976),
      map: this.map
    });
  },

  componentDidMount: function() {
    this.map = this.createMap();
    this.marker = this.createMarker();
    //this.infoWindow = this.createInfoWindow();
  },

  render: function() {
    return (
      <div>
      <section id="map" ref="map_canvas"></section>
      </div>
    );
  }
});
