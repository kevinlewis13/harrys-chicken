'use strict';

var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return { entrees: [], sides: [], sauces: [], drinks: [], restaurant: 'chicken', category: 'entrees' };
  },

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
            <input name="description" type="text" defaultValue={item.description}></input>
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

  sepByCategory: function() {
    var entrees = [];
    var sides = [];
    var sauces = [];
    var drinks = [];

     _.map(this.props.menu, function(item, index) {
       console.log('here now');
       console.log(item.category);
      if(item.category === 'entrees') {
        console.log(item.title);
        return entrees.push(item);
      }
      if(item.category === 'sides') {
        sides.push(item);
      }
      if(item.category === 'sauces') {
        sauces.push(item);
      }
      if(item.category === 'drinks') {
        drinks.push(item);
      }

  });
    console.log(entrees);
    this.setState({entrees: entrees, sides: sides, sauces: sauces, drinks: drinks});
    //console.log(entrees);
  },

  componentDidMount: function() {
    this.sepByCategory();
    console.log('memememe');
  },

  renderOrigMenuForms: function() {
      return _.map(this.props.menu, function(item, index) {
        var selectedRestaurant;
        var selectedCategory;
        var nameref = "name" + item._id;

        if (item.category === 'entrees') {
          selectedCategory = (
            <select name="category" ref="category" defaultValue="entrees">
              <option value="entrees">Entree</option>
              <option value="sides">Side</option>
              <option value="sauces">Sauce</option>
              <option value="drinks">Drink</option>
            </select>
          );
        }
        if (item.category === 'sides') {
          selectedCategory = (
            <select name="category" ref="category" defaultValue="sides">
              <option value="entrees">Entree</option>
              <option value="sides">Side</option>
              <option value="sauces">Sauce</option>
              <option value="drinks">Drink</option>
            </select>
          );
        }
        if (item.category === 'sauces') {
          selectedCategory = (
            <select name="category" ref="category" defaultValue="sauces">
              <option value="entrees">Entree</option>
              <option value="sides">Side</option>
              <option value="sauces">Sauce</option>
              <option value="drinks">Drink</option>
            </select>
          );
        }
        if (item.category === 'drinks') {
          selectedCategory = (
            <select name="category" ref="category" defaultValue="drinks">
              <option value="entrees">Entree</option>
              <option value="sides">Side</option>
              <option value="sauces">Sauce</option>
              <option value="drinks">Drink</option>
            </select>
          );
        }
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
            <input name="name" required type="text" defaultValue={item.title} ref={nameref}></input>
            <label htmlFor="price">Price</label>
            <input name="price" required type="text" defaultValue={item.price}></input>
            <label htmlFor="description">Description</label>
            <input name="description" type="text" defaultValue={item.description}></input>
            <label htmlFor="index">Index</label>
            <input name="index" type="text" defaultValue={item.index + 1}></input>
              {selectedRestaurant}
              {selectedCategory}
            <button type="submit">Save Changes</button>
            <button onClick={this.handleDelete.bind(null, item._id)}>Delete Item</button>
          </form>
        );
      }, this);
  },

  handleDelete: function(item, evt) {
    evt.preventDefault();
    this.props.delete(item);
  },

  //this function is not currently used
  handleEdit: function(ide, evt) {
    //<button onClick={this.handleEdit.bind(null, item._id)}>button to save changes</button>
    evt.preventDefault();
    console.log(ide);
    var nameref = "name" + ide;
    //just seeing what everything does
    console.log(React.findDOMNode(this.refs.nameref));
    console.log(React.findDOMNode(this.refs.ide));
    console.log(React.findDOMNode(this.refs.newprice));
    console.log(evt.target);

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

  render: function() {
    console.log(this.state);
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
