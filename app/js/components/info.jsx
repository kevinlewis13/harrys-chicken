'use strict';

var React = require('react');
var Map = require('./map.jsx');
var Details = require('./details.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <article>
        <Map/>
        <Details details={this.props.details}/>
      </article>
    );
  }
});
