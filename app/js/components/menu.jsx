var React = require('react');
var Category = require('./category.jsx');
var _ = require('lodash');

module.exports = React.createClass({
  renderCategories: function() {
    var byCategory = _.groupBy(this.props.menu, function(dish) {
      return dish.category;
    });
    var categories = _.keys(byCategory);

    return _.map(categories, function(category) {
      return (
        <li key={category}>{category}
          <Category category={byCategory[category]}/>
        </li>
      );
    });
  },

  render: function() {
    return (
      <ul>{this.renderCategories()}</ul>
    );
  }
});
