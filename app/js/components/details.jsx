'use strict';

var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    var phone = this.props.restaurantInfo.phone;
    var address = this.props.restaurantInfo.address;
    var hours = this.props.restaurantInfo.hours;

    return { phone: phone, address: address, hours: hours };
  },

  formatAddress: function() {
    var splitAddress = this.state.address.split('\n');
    var numberAndStreet = splitAddress[0];
    var cityAndState = splitAddress[1];

    return (
      <p>{numberAndStreet}<br/>{cityAndState}</p>
    );
  },

  render: function() {
    return (
      <section className="details large-4 large-offset-2 columns">
        <h3>Our Deets</h3>
        <h4>Phone</h4>
        <p>{this.state.phone}</p>
        <h4>Address</h4>
        {this.formatAddress()}
        <h4>Hours</h4>
        <p>{this.state.hours}</p>
      </section>
    );
  }
});
