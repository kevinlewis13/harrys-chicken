'use strict';

var React = require('react');
var Menu = require('./menu.jsx');
var _ = require('lodash');

module.exports = React.createClass({
  renderOrigMenuForms: function() {
      return _.map(this.props.initialMenu, function(item) {
        var selectedRestaurant;
        var selectedCategory;
        if (item.category === 'entrees') {
          selectedCategory = (
            <select name="category" ref="category">
              <option selected value="entrees">Entree</option>
              <option value="sides">Side</option>
              <option value="sauces">Sauce</option>
              <option value="drinks">Drink</option>
            </select>
          );
        }
        if (item.category === 'sides') {
          selectedCategory = (
            <select name="category" ref="category">
              <option value="entrees">Entree</option>
              <option selected value="sides">Side</option>
              <option value="sauces">Sauce</option>
              <option value="drinks">Drink</option>
            </select>
          );
        }
        if (item.category === 'sauces') {
          selectedCategory = (
            <select name="category" ref="category">
              <option value="entrees">Entree</option>
              <option value="sides">Side</option>
              <option selected value="sauces">Sauce</option>
              <option value="drinks">Drink</option>
            </select>
          );
        }
        if (item.category === 'drinks') {
          selectedCategory = (
            <select name="category" ref="category">
              <option value="entrees">Entree</option>
              <option selected value="sides">Side</option>
              <option value="sauces">Sauce</option>
              <option selected value="drinks">Drink</option>
            </select>
          );
        }
        if (item.restaurant === 'chicken') {
          selectedRestaurant = (
            <select name="restaurant" ref="restaurant">
              <option selected value="chicken">Chicken Joint</option>
              <option value="coffee">Coffee Joint</option>
            </select>
          );
        }
        if (item.restaurant === 'coffee') {
          selectedRestaurant = (
            <select name="restaurant" ref="restaurant">
              <option value="chicken">Chicken Joint</option>
              <option coffee value="coffee">Coffee Joint</option>
            </select>
          );
        }
        return (
          <form>
            <input required type="text" value={item.title}></input>
            <input required type="text" value={item.price}></input>
            <input type="text" value={item.description}></input>
              {selectedRestaurant}
              {selectedCategory}
            <button>button to save changes</button>
            <button onClick={this.handleDelete.bind(null, item._id)}>button to delete item altogether</button>
          </form>
        );
      }, this);
    //mapping statement to return form w/ inputs with vals of props of initial menu, save button, and delete button
  },

  handleDelete: function(item) {
    this.props.delete(item);
  },

  getInitialState: function() {
    //why is this returning empty to start with? async? weird, right?
    return {origMenu: this.props.initialMenu};
  },

  componentDidMount: function() {
    console.log(this.props.initialMenu);
    console.log(this.state.origMenu);
  },

  handleNewSubmit: function(evt) {
    evt.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var price = parseFloat(React.findDOMNode(this.refs.price).value.trim());
    var description = React.findDOMNode(this.refs.description).value.trim();
    var restaurant = React.findDOMNode(this.refs.restaurant).value;
    var category = React.findDOMNode(this.refs.category).value;
    var newItem = {restaurant: restaurant, title: name, price: price, description: description, category: category};
    this.setState({origMenu: this.props.initialMenu});
    console.log(this.state.origMenu);
    console.log(this.props.initialMenu);
    this.state.origMenu.push(newItem);
    this.props.add(newItem);

  },

  render: function() {
    return (
      <article className="slab form">
        <section className="content form">
          <p>Add a new menu Item</p>
          <form onSubmit={this.handleNewSubmit}>
            <select name="restaurant" ref="restaurant">
              <option value="chicken">Chicken Joint</option>
              <option value="coffee">Coffee Joint</option>
            </select>
            <select name="category" ref="category">
              <option value="entrees">Entree</option>
              <option value="sides">Side</option>
              <option value="sauces">Sauce</option>
              <option value="drinks">Drink</option>
            </select>
            <input required type="text" placeholder="item name" ref="name" />
            <input required type="text" placeholder="item price" ref="price" />
            <input type="text" placeholder="item description" ref="description" />
            <input type="submit" value="Add menu item" />
            <button onClick={this.props.delete}>Delete Button</button>
          </form>
        </section>
        <section className="content form">
          <p>Change items on the current menu</p>
          <ul>
            {this.renderOrigMenuForms()}
          </ul>
        </section>
      </article>
    );
  }
});
