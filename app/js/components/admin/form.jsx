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
          <FormCategory formCategoryDishes={formCategoryGroups[category.value]} determine={this.props.determine}
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

  handleDelete: function(dish) {
    this.props.delete(dish);
  },

  buildItem: function(formEl) {
    return {
      restaurant: formEl.querySelector('[name="restaurant"]').value,
      title: formEl.querySelector('[name="name"]').value,
      price: formEl.querySelector('[name="price"]').value,
      description: formEl.querySelector('[name="description"]').value,
      category: formEl.querySelector('[name="category"]').value,
      index: formEl.querySelector('[name="index"]').value - 1
    };
  },

  handleUpdateItem: function(id, updatedItem) {
    return this.props.edit(id, updatedItem);
  },

  handleCreateItem: function(evt) {
    evt.preventDefault();
    var item = this.buildItem(evt.target);

    this.props.add(item);
  },

  componentDidMount: function() {
    this.props.determine();
  },

  render: function() {
    // <Input placeholder="item description" isRequired={false} labelName="Description" name="description"/>
    return (
      <article className="slab form">
        <section className="content form form-visible">
          <form name="newItem" onSubmit={this.handleCreateItem}>
            <header className="dish-edit-header">
              <h4>Add a new menu item</h4>
              <button className="add-item-button confirm" type="submit">Add item</button>
            </header>
            <div className="form-left">
              <Input placeholder="item name" isRequired={true} labelName="Name" name="name"/>
              <Input placeholder="item price" isRequired={true} labelName="Price" name="price"/>
              <Input placeholder="item index" isRequired={true} labelName="Menu Position" name="index" />
            </div>
            <div className="form-right">
              <label className="textarea-label">Description
                <textarea name="description" rows="5"></textarea>
              </label>
              <Dropdown name="restaurant" default="chicken" options={this.props.restaurantOptions}/>
              <Dropdown name="category" default="entrees"/>
            </div>
          </form>
        </section>
        <section className="content form">
          <h4>Change items on the current menu</h4>
          {this.renderUpdateItemForms()}
        </section>
      </article>
    );
  }
});
