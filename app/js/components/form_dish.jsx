'use strict';

var React = require('react');

module.exports = React.createClass({
  handleSubmitEdit: function(id, evt) {
    this.props.edit(id, evt);
  },

  handleDelete: function(id, evt) {
    this.props.delete(id, evt);
  },

  render: function() {
    return (
      <form name="updateItem" key={this.props.dish._id}
        onSubmit={this.handleSubmitEdit.bind(null, this.props.dish._id)}>
        <label htmlFor="name">Name</label>
        <input name="name" required type="text" defaultValue={this.props.dish.title}></input>
        <label htmlFor="price">Price</label>
        <input name="price" required type="text" defaultValue={this.props.dish.price}></input>
        <label htmlFor="description">Description</label>
        <input name="description" type="text" defaultValue={this.props.dish.description}></input>
        <label htmlFor="index">Index</label>
        <input name="index" type="text" defaultValue={this.props.dish.index + 1}></input>
        <select name="restaurant" ref="restaurant" defaultValue={this.props.dish.restaurant}>
          <option value="chicken">Chicken Joint</option>
          <option value="coffee">Coffee Joint</option>
        </select>
        <select name="category" ref="category" defaultValue={this.props.dish.category}>
          <option value="entrees">Entree</option>
          <option value="sides">Side</option>
          <option value="sauces">Sauce</option>
          <option value="drinks">Drink</option>
        </select>
        <button type="submit">Save Changes</button>
        <button onClick={this.handleDelete.bind(null, this.props.dish._id)}>Delete Item</button>
      </form>
    );
  }
});
