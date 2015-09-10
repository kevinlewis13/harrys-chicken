'use strict';

var React = require('react');
var FormDish = require('./form_dish.jsx');
var _ = require('lodash');

module.exports = React.createClass({
  renderFormDish: function() {
    return _.map(this.props.formCategoryDishes, function(dish) {
      return (
        <FormDish categoryOptions={this.props.categoryOptions}
          restaurantOptions={this.props.restaurantOptions} dish={dish}
          key={dish._id} submit={this.props.submit} delete={this.props.delete}
        />
      );
    }, this);
  },

  render: function() {
    return (
      <ul>{this.renderFormDish()}</ul>
    );
  }
});
