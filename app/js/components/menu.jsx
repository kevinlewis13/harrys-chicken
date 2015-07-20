var React = require('react');
var Category = require('./category.jsx');
var _ = require('lodash');

module.exports = React.createClass({
  renderCategories: function() {
    var categoryGroups = this.groupByCategories();
    var categoryNames = _.keys(categoryGroups);

    return _.map(categoryNames, function(categoryName) {
      return (
        <li key={categoryName}>{categoryName}
          <Category categoryDishes={categoryGroups[categoryName]}/>
        </li>
      );
    });
  },

  groupByCategories: function() {
    return _.groupBy(this.props.menu, function(dish) {
      return dish.category;
    });
  },

  render: function() {
    return (
      <ul>{this.renderCategories()}</ul>
    );
  }
});
