'use strict';

var React = require('react');
var Category = require('./category.jsx');
var _ = require('lodash');

module.exports = React.createClass({
  renderCategories: function() {
    var categoryGroups = this.groupByCategories();
    var categoryNames = this.props.categories;
    var categoryTitle;

    return _.map(categoryNames, function(categoryName) {
      categoryTitle = categoryName[0].toUpperCase() + categoryName.slice(1);
      var categoryClass = categoryName + ' category';

      return (
        <li key={categoryName} className={categoryClass}>
          <p className="category-title">{categoryTitle}</p>
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
    if(this.props.categories.length > 1) {
      return (
        <article className="slab menu">
          <section className="content menu">
            <span id="menu" className="clear-header"></span>
            <h3>Our Menu</h3>
            <ul>{this.renderCategories()}</ul>
          </section>
        </article>
      );
    } else {
      return (
          <section>
            <ul>{this.renderCategories()}</ul>
          </section>
      );
    }
  }
});
