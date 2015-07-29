'use strict';

var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    var phone = this.props.restaurantInfo.phone;
    var address = this.props.restaurantInfo.address;
    var hours = this.props.restaurantInfo.hours;

    return { phone: phone, address: address, hours: hours };
  },

  render: function() {
    return (
      <section className="details">
        <p>Phone: {this.state.phone}</p>
        <p>Address: {this.state.address}</p>
        <p>Hours: {this.state.hours}</p>
      </section>
    );
  }
});
