'use strict';

var React = require('react');

module.exports = React.createClass({
  map: null,
  marker: null,

  createMap: function() {
    var harrys = new google.maps.LatLng(47.547487, -122.386976);
    var mapProps = {
      center:harrys,
      zoom:15,
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
      <section id="map" ref="map_canvas"></section>
    );
  }

  // getDefaultProps: function () {
  //     return {
  //         initialZoom:15,
  //         mapCenterLat: 47.547487,
  //         mapCenterLng: -122.386976,
  //     };
  // },
  // componentDidMount: function (rootNode) {
  //     var mapOptions = {
  //         center: this.mapCenterLatLng(),
  //         zoom: this.props.initialZoom
  //     },
  //     map = new google.maps.Map(this.getDOMNode(), mapOptions);
  //     var marker = new google.maps.Marker({position: this.mapCenterLatLng(), title: 'Hi', map: map});
  //     this.setState({map: map});
  // },
  // mapCenterLatLng: function () {
  //     var props = this.props;
  //     return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
  // },
  // render: function () {
  //     return (
  //       <section id="map" ref="map_canvas"></section>
  //     );
  // }

});
