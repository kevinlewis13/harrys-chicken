var React = require('react');
var Dish = require('./dish.jsx');
var _ = require('lodash');

module.exports = React.createClass({
  renderDish: function() {
    return _.map(this.props.category, function(dish) {
      return <Dish dish={dish} key={dish._id}/>;
    });
  },

  render: function() {
    return (
      <ul>{this.renderDish()}</ul>
    );
  }
});
