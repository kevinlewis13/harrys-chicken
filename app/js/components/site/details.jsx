'use strict';

var React = require('react');

module.exports = React.createClass({
  formatAddress: function(address) {
    var splitAddress = address.split('\n');
    var numberAndStreet = splitAddress[0];
    var cityAndState = splitAddress[1];

    return (
      <p>{numberAndStreet}<br/>{cityAndState}</p>
    );
  },

  render: function() {
    var phone = this.props.restaurantInfo.phone;
    var address = this.props.restaurantInfo.address;
    var hours = this.props.restaurantInfo.hours;

    return (
      <section className="details large-4 large-offset-2 medium-12 small-12 columns">
        <h4>Phone</h4>
        <p>{phone}</p>
        <h4>Address</h4>
        {this.formatAddress(address)}
        <h4>Hours</h4>
        <p>{hours}</p>
      </section>
    );
  }
});
