'use strict';

var React = require('react');
var Category = require('./category.jsx');
var _ = require('lodash');

module.exports = React.createClass({
  renderCategories: function() {
    var categoryGroups = this.groupByCategories();
    var categoryNames = ['entrees', 'sides', 'sauces', 'drinks'];
    var categoryTitle;

    return _.map(categoryNames, function(categoryName) {
      categoryTitle = categoryName[0].toUpperCase() + categoryName.slice(1);

      return (
        <li key={categoryName} className="category large-6 columns">
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
    return (
      <article className="slab menu">
        <section className="content menu">
          <span id="menu" className="clear-header"></span>
          <h3>Our Menu</h3>
          <ul className="row">{this.renderCategories()}</ul>
        </section>
      </article>
    );
  }
});
