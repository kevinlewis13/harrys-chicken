'use strict';

var React = require('react');
var _ = require('lodash');
var FormCategory = require('./form_category.jsx');
var Input = require('./input.jsx');
var Dropdown = require('./dropdown.jsx');

module.exports = React.createClass({

  renderUpdateItemForms: function() {
    var formCategoryGroups = this.groupByCategories();

    return _.map(this.props.categoryOptions, function(category) {
      return (
        <section key={category.value} className="form-category">
          <h3 className="form-category-title">{category.value}</h3>
          <FormCategory formCategoryDishes={formCategoryGroups[category.value]}
            categoryOptions={this.props.categoryOptions} restaurantOptions={this.props.restaurantOptions}
            update={this.handleUpdateItem} delete={this.handleDelete} buildItem={this.buildItem}
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

  buildItem: function(form) {
    return {
      restaurant: form.querySelector('[name="restaurant"]').value,
      title: form.querySelector('[name="name"]').value,
      price: form.querySelector('[name="price"]').value,
      description: form.querySelector('[name="description"]').value,
      category: form.querySelector('[name="category"]').value,
      index: form.querySelector('[name="index"]').value - 1
    };
  },

  handleUpdateItem: function(id, form) {
    var item = this.buildItem(form);

    return this.props.edit(id, item);
  },

  handleCreateItem: function(evt) {
    evt.preventDefault();
    var item = this.buildItem(evt.target);

    this.props.add(item);
  },

  render: function() {
    return (
      <article className="slab form">
        <section className="content form">
          <label htmlFor="newItem">Add a new menu Item</label>
          <form name="newItem" onSubmit={this.handleCreateItem}>
            <Input placeholder="item name" isRequired={true} labelName="Name" name="name"/>
            <Input placeholder="item price" isRequired={true} labelName="Price" name="price"/>
            <Input placeholder="item description" isRequired={false} labelName="Description" name="description"/>
            <Input placeholder="item index" isRequired={true} labelName="Menu Position" name="index" />
            <Dropdown name="restaurant" default="chicken" options={this.props.restaurantOptions}/>
            <Dropdown name="category" default="entrees" options={this.props.categoryOptions}/>
            <button className="add-item-button confirm" type="submit">Add item</button>
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
