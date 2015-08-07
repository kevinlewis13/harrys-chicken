'use strict';

var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return { restaurant: 'chicken', category: 'entrees' };
  },

//maybe instead of the below, we could create four empty arrays, one for each category
//we could then loop through the entire menu and push items to the appropriate arrays
//then we'd have to have a render function for each category, so it might
//be more overhead, but would help up organize the update forms section
  renderOrigMenuForms: function() {
      return _.map(this.props.menu, function(item) {
        var selectedRestaurant;
        var selectedCategory;
        //to make unique refs for every name input
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
        //console.log(nameref);
        return (
          //key is needed to stop the warnings
          <form key={item._id} onSubmit={this.handleSubmitEdit.bind(null, item._id)}>
            //this is where I'm trying to get a unique ref for everything. I also tried ref={nameref} (declared on line 15), then just went straight for the id
            <input name="name" required type="text" defaultValue={item.title} ref={item._id}></input>
            //if we do refs like this, it grabs the last form rendered, so whatever is at the bottom of the list
            <input name="price" required type="text" defaultValue={item.price} ref="newprice"></input>
            <input name="description" type="text" defaultValue={item.description}></input>
              {selectedRestaurant}
              {selectedCategory}
            <button onClick={this.handleEdit.bind(null, item._id)}>button to save changes</button>
            <button onClick={this.handleDelete.bind(null, item._id)}>button to delete item altogether</button>
            <input type="submit" value="SUBMIT" />
          </form>
        );
      }, this);
    //mapping statement to return form w/ inputs with vals of props of initial menu, save button, and delete button
  },

  handleDelete: function(item, evt) {
    evt.preventDefault();
    this.props.delete(item);
  },

  handleEdit: function(ide, evt) {
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
    var updatedItem = {restaurant: restaurant, title: name, price: price, description: description, category: category};
    console.log(updatedItem);

    this.props.edit(id, updatedItem);
  },

  handleAdd: function(evt) {
    evt.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var price = parseFloat(React.findDOMNode(this.refs.price).value.trim());
    var description = React.findDOMNode(this.refs.description).value.trim();
    var restaurant = this.state.restaurant;
    var category = this.state.category;
    var newItem = {restaurant: restaurant, title: name, price: price, description: description, category: category};
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
          <p>Add a new menu Item</p>
          <form onSubmit={this.handleAdd}>
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
            <input type="submit" value="Add menu item" />
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
