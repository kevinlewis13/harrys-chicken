'use strict';

var React = require('react');
var Map = require('./map.jsx');
var Details = require('./details.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="wrapper">
        <div id="location" className="clear-header"></div>
        <section className="slab info">
          <Map/>
          <Details restaurantInfo={this.props.restaurantInfo}/>
        </section>
      </div>
    );
  }
});
