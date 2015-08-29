'use strict';

var React = require('react');
var FormDish = require('./form_dish.jsx');
var _ = require('lodash');

module.exports = React.createClass({
  renderFormDish: function() {
    return _.map(this.props.formCategoryDishes, function(dish) {
      return (
        <FormDish dish={dish} key={dish._id}
          edit={this.props.edit} delete={this.props.delete}
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
