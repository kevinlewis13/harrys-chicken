'use strict';

var React = require('react');
var _ = require('lodash');
var FormCategory = require('./form_category.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return { restaurant: 'chicken', category: 'entrees' };
  },

  renderFormCategories: function() {
    var formCategoryGroups = this.groupByCategories();
    var formCategoryNames = [
      'entrees', 'sides', 'sauces', 'drinks', 'beverages', 'pastries', 'extras'
    ];

    return _.map(formCategoryNames, function(formCategoryName) {
      var formCategoryClass = formCategoryName + ' form-category';

      return (
        <section key={formCategoryName} className={formCategoryClass}>
          <h3>{formCategoryName}</h3>
          <FormCategory formCategoryDishes={formCategoryGroups[formCategoryName]}
            edit={this.handleSubmitEdit} delete={this.handleDelete}
          />
        </section>
      );
    }, this);
  },

  groupByCategories: function() {
    return _.groupBy(this.props.menu, function(dish) {
      return dish.category;
    });
  },

  handleDelete: function(id, evt) {
    evt.preventDefault();
    this.props.delete(id);
  },

  handleSubmitEdit: function(id, evt) {
    evt.preventDefault();
    var form = evt.target;
    var name = form.querySelector('[name="name"]').value;
    var price = form.querySelector('[name="price"]').value;
    var description = form.querySelector('[name="description"]').value;
    var restaurant = form.querySelector('[name="restaurant"]').value;
    var category = form.querySelector('[name="category"]').value;
    var index = form.querySelector('[name="index"]').value - 1;
    var updatedItem = {restaurant: restaurant, title: name, price: price, description: description, category: category, index: index};

    this.props.edit(id, updatedItem);
  },

  handleAdd: function(evt) {
    evt.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var price = React.findDOMNode(this.refs.price).value.trim();
    var description = React.findDOMNode(this.refs.description).value.trim();
    var restaurant = this.state.restaurant;
    var category = this.state.category;
    var index = React.findDOMNode(this.refs.index).value -1;
    var newItem = {restaurant: restaurant, title: name, price: price, description: description, category: category, index: index};
    this.props.add(newItem);

  },

  handleCategoryChange: function(evt) {
    this.setState({category: evt.target.value});
  },

  handleRestaurantChange: function(evt) {
    this.setState({restaurant: evt.target.value});
  },

  render: function() {
    return (
      <article className="slab form">
        <section className="content form">
          <label htmlFor="newItem">Add a new menu Item</label>
          <form name="newItem" onSubmit={this.handleAdd}>
            <select name="restaurant" ref="restaurant" onChange={this.handleRestaurantChange}>
              <option value="chicken">Chicken Joint</option>
              <option value="coffee">Coffee Joint</option>
            </select>
            <select name="category" ref="category" onChange={this.handleCategoryChange}>
              <option value="entrees">Entree</option>
              <option value="sides">Side</option>
              <option value="sauces">Sauce</option>
              <option value="drinks">Drink</option>
            </select>
            <input required type="text" placeholder="item name" ref="name" />
            <input required type="text" placeholder="item price" ref="price" />
            <input type="text" placeholder="item description" ref="description" />
            <input type="text" placeholder="item index" ref="index" />
            <button type="submit">Add menu item</button>
          </form>
        </section>
        <section className="content form">
          <label htmlFor="updateItem">Change items on the current menu</label>
          {this.renderFormCategories()}
        </section>
      </article>
    );
  }
});
