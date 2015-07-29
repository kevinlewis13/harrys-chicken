'use strict';

var React = require('react');
var Map = require('./map.jsx');
var Details = require('./details.jsx');

module.exports = React.createClass({
  render: function() {
    return (
        <section className="slab info">
          <span id="location" className="clear-header"></span>
          <Map/>
          <Details restaurantInfo={this.props.restaurantInfo}/>
        </section>
    );
  }
});
