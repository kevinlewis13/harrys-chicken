'use strict';

var React = require('react');
var _ = require('lodash');
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function() {
    return { entrees: [], sides: [], sauces: [], drinks: [], restaurant: 'chicken', category: 'entrees' };
  },

  // determineCategories: function() {
  //   var chickenCategories = [
  //     {display: "Entree", value: "entrees"},
  //     {display: "Side", value: "sides"},
  //     {display: "Drink", value: "drinks"},
  //     {display: "Sauce", value: "sauces"}
  //   ];
  //
  //   var coffeeCategories = [
  //     {display: "Beverage", value: "beverages"},
  //     {display: "Baked Good", value: "baked_goods"},
  //     {display: "Extra",  value: "extras"}
  //   ];
  //
  //   $("#parent_selector").change(function() {
  //     var parent = $(this).val();
  //
  //     switch(parent) {
  //       case 'chicken':
  //         list(chickenCategories);
  //         break;
  //       case 'coffee':
  //         list(coffeeCategories);
  //     }
  //   })
  // },

  renderEntrees: function() {
    var selectedRestaurant;
    return _.map(this.props.menu, function(item, index) {
      if (item.category === 'entrees') {
        if (item.restaurant === 'chicken') {
          selectedRestaurant = (
            <select name="restaurant" ref="restaurant" defaultValue="chicken">
              <option value="chicken">Chicken Joint</option>
              <option value="coffee">Coffee Joint</option>
            </select>
          );
        }
        if (item.restaurant === 'coffee') {
          selectedRestaurant = (
            <select name="restaurant" ref="restaurant" defaultValue="coffee">
              <option value="chicken">Chicken Joint</option>
              <option value="coffee">Coffee Joint</option>
            </select>
          );
        }
        return (
          <form name="updateItem" key={item._id} onSubmit={this.handleSubmitEdit.bind(null, item._id)}>
            <label htmlFor="name">Name</label>
            <input name="name" required type="text" defaultValue={item.title}></input>
            <label htmlFor="price">Price</label>
            <input name="price" required type="text" defaultValue={item.price}></input>
            <label htmlFor="description">Description</label>
            <textarea rows="10" cols="50" name="description" defaultValue={item.description}></textarea>
            <label htmlFor="index">Index</label>
            <input name="index" type="text" defaultValue={item.index + 1}></input>
              {selectedRestaurant}
            <select name="category" ref="category" defaultValue="entrees">
              <option value="entrees">Entree</option>
              <option value="sides">Side</option>
              <option value="sauces">Sauce</option>
              <option value="drinks">Drink</option>
            </select>
            <button type="submit">Save Changes</button>
            <button onClick={this.handleDelete.bind(null, item._id)}>Delete Item</button>
          </form>
        );
      }
    }, this);
  },

  renderSides: function() {
    var selectedRestaurant;
    return _.map(this.props.menu, function(item, index) {
      if (item.category === 'sides') {
        if (item.restaurant === 'chicken') {
          selectedRestaurant = (
            <select name="restaurant" ref="restaurant" defaultValue="chicken">
              <option value="chicken">Chicken Joint</option>
              <option value="coffee">Coffee Joint</option>
            </select>
          );
        }
        if (item.restaurant === 'coffee') {
          selectedRestaurant = (
            <select name="restaurant" ref="restaurant" defaultValue="coffee">
              <option value="chicken">Chicken Joint</option>
              <option value="coffee">Coffee Joint</option>
            </select>
          );
        }
        return (
          <form name="updateItem" key={item._id} onSubmit={this.handleSubmitEdit.bind(null, item._id)}>
            <label htmlFor="name">Name</label>
            <input name="name" required type="text" defaultValue={item.title}></input>
            <label htmlFor="price">Price</label>
            <input name="price" required type="text" defaultValue={item.price}></input>
            <label htmlFor="description">Description</label>
            <input name="description" type="text" defaultValue={item.description}></input>
            <label htmlFor="index">Index</label>
            <input name="index" type="text" defaultValue={item.index + 1}></input>
              {selectedRestaurant}
            <select name="category" ref="category" defaultValue="sides">
              <option value="entrees">Entree</option>
              <option value="sides">Side</option>
              <option value="sauces">Sauce</option>
              <option value="drinks">Drink</option>
            </select>
            <button type="submit">Save Changes</button>
            <button onClick={this.handleDelete.bind(null, item._id)}>Delete Item</button>
          </form>
        );
      }
    }, this);
  },

  renderSauces: function() {
    var selectedRestaurant;
    return _.map(this.props.menu, function(item, index) {
      if (item.category === 'sauces') {
        if (item.restaurant === 'chicken') {
          selectedRestaurant = (
            <select name="restaurant" ref="restaurant" defaultValue="chicken">
              <option value="chicken">Chicken Joint</option>
              <option value="coffee">Coffee Joint</option>
            </select>
          );
        }
        if (item.restaurant === 'coffee') {
          selectedRestaurant = (
            <select name="restaurant" ref="restaurant" defaultValue="coffee">
              <option value="chicken">Chicken Joint</option>
              <option value="coffee">Coffee Joint</option>
            </select>
          );
        }
        return (
          <form name="updateItem" key={item._id} onSubmit={this.handleSubmitEdit.bind(null, item._id)}>
            <label htmlFor="name">Name</label>
            <input name="name" required type="text" defaultValue={item.title}></input>
            <label htmlFor="price">Price</label>
            <input name="price" required type="text" defaultValue={item.price}></input>
            <label htmlFor="description">Description</label>
            <input name="description" type="text" defaultValue={item.description}></input>
            <label htmlFor="index">Index</label>
            <input name="index" type="text" defaultValue={item.index + 1}></input>
              {selectedRestaurant}
            <select name="category" ref="category" defaultValue="sauces">
              <option value="entrees">Entree</option>
              <option value="sides">Side</option>
              <option value="sauces">Sauce</option>
              <option value="drinks">Drink</option>
            </select>
            <button type="submit">Save Changes</button>
            <button onClick={this.handleDelete.bind(null, item._id)}>Delete Item</button>
          </form>
        );
      }
    }, this);
  },

  renderDrinks: function() {
    var selectedRestaurant;
    return _.map(this.props.menu, function(item, index) {
      if (item.category === 'drinks') {
        if (item.restaurant === 'chicken') {
          selectedRestaurant = (
            <select name="restaurant" ref="restaurant" defaultValue="chicken">
              <option value="chicken">Chicken Joint</option>
              <option value="coffee">Coffee Joint</option>
            </select>
          );
        }
        if (item.restaurant === 'coffee') {
          selectedRestaurant = (
            <select name="restaurant" ref="restaurant" defaultValue="coffee">
              <option value="chicken">Chicken Joint</option>
              <option value="coffee">Coffee Joint</option>
            </select>
          );
        }
        return (
          <form name="updateItem" key={item._id} onSubmit={this.handleSubmitEdit.bind(null, item._id)}>
            <label htmlFor="name">Name</label>
            <input name="name" required type="text" defaultValue={item.title}></input>
            <label htmlFor="price">Price</label>
            <input name="price" required type="text" defaultValue={item.price}></input>
            <label htmlFor="description">Description</label>
            <input name="description" type="text" defaultValue={item.description}></input>
            <label htmlFor="index">Index</label>
            <input name="index" type="text" defaultValue={item.index + 1}></input>
              {selectedRestaurant}
            <select name="category" ref="category" defaultValue="drinks">
              <option value="entrees">Entree</option>
              <option value="sides">Side</option>
              <option value="sauces">Sauce</option>
              <option value="drinks">Drink</option>
            </select>
            <button type="submit">Save Changes</button>
            <button onClick={this.handleDelete.bind(null, item._id)}>Delete Item</button>
          </form>
        );
      }
    }, this);
  },

  handleDelete: function(item, evt) {
    evt.preventDefault();
    this.props.delete(item);
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
    console.log(updatedItem);

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

  // componentDidMount: function() {
  //   this.determineCategories();
  // },

  render: function() {
    console.log(this.state);
    return (
      <article className="slab form">
        <section className="content form">
          <label htmlFor="newItem">Add a new menu Item</label>
          <form name="newItem" onSubmit={this.handleAdd}>
            <select id="parent_selector" name="restaurant" ref="restaurant" onChange={this.handleRestaurantChange}>
              <option value="chicken">Chicken Joint</option>
              <option value="coffee">Coffee Joint</option>
            </select>
            <select id="child_selector" name="category" ref="category" onChange={this.handleCategoryChange}>
              <option value="entrees">Entree</option>
              <option value="sides">Side</option>
              <option value="sauces">Sauce</option>
              <option value="drinks">Drink</option>
              <option value="beverages">Beverage</option>
              <option value="extras">Extra</option>
              <option value="baked_goods">Baked Good</option>
            </select>
            <input required type="text" placeholder="item name" ref="name" />
            <input required type="text" placeholder="item price" ref="price" />
            <input type="textarea" placeholder="item description" ref="description" />
            <input type="text" placeholder="item index" ref="index" />
            <button type="submit">Add menu item</button>
          </form>
        </section>
        <section className="content form">
          <label htmlFor="updateItem">Change items on the current menu</label>
          <ul>
            <h3>Entrees</h3>
            {this.renderEntrees()}
          </ul>
          <ul>
            <h3>Sides</h3>
            {this.renderSides()}
          </ul>
          <ul>
            <h3>Sauces</h3>
            {this.renderSauces()}
          </ul>
          <ul>
            <h3>Drinks</h3>
            {this.renderDrinks()}
          </ul>
        </section>
      </article>
    );
  }
});
