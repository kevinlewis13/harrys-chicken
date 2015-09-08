'use strict';

var React = require('react');
var _ = require('lodash');
var FormCategory = require('./form_category.jsx');
var Input = require('./input.jsx');
var DropDown = require('./select.jsx');

module.exports = React.createClass({

  renderUpdateItemForms: function() {
    var formCategoryGroups = this.groupByCategories();

    return _.map(this.props.categoryOptions, function(category) {
      return (
        <section key={category.value} className="form-category">
          <h3>{category.value}</h3>
          <FormCategory
            categoryOptions={this.props.categoryOptions}
            restaurantOptions={this.props.restaurantOptions}
            formCategoryDishes={formCategoryGroups[category.value]}
            submit={this.handleSubmit} delete={this.handleDelete}
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

  handleSubmit: function(id, evt) {
    evt.preventDefault();
    var form = evt.target;
    var name = form.querySelector('[name="name"]').value;
    var price = form.querySelector('[name="price"]').value;
    var description = form.querySelector('[name="description"]').value;
    var restaurant = form.querySelector('[name="restaurant"]').value;
    var category = form.querySelector('[name="category"]').value;
    var index = form.querySelector('[name="index"]').value - 1;
    var item = {restaurant: restaurant, title: name, price: price, description: description, category: category, index: index};

    if (id) {
      return this.props.edit(id, item);
    }
    this.props.add(item);
  },

  render: function() {

    return (
      <article className="slab form">
        <section className="content form">
          <label htmlFor="newItem">Add a new menu Item</label>
          <form name="newItem" onSubmit={this.handleSubmit.bind(null, null)}>
            <Input placeholder="item name" isRequired={true} labelName="Name" name="name"/>
            <Input placeholder="item price" isRequired={true} labelName="Price" name="price"/>
            <Input placeholder="item description" isRequired={false} labelName="Description" name="description"/>
            <Input placeholder="item index" isRequired={true} labelName="Menu Position" name="index" />
            <DropDown name="restaurant" default="chicken" options={this.props.restaurantOptions}/>
            <DropDown name="category" default="entrees" options={this.props.categoryOptions}/>
            <button type="submit">Add menu item</button>
          </form>
        </section>
        <section className="content form">
          <label htmlFor="updateItem">Change items on the current menu</label>
          {this.renderUpdateItemForms()}
        </section>
      </article>
    );
  }
});
