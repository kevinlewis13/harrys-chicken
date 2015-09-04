'use strict';

var React = require('react');
var Input = require('./input.jsx');

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
        <Input isRequired={true} labelName="Name" name="name" default={this.props.dish.title} placeholder="item name"/>
        <Input isRequired={true} labelName="Price" name="price" default={this.props.dish.price} placeholder="item price"/>
        <Input isRequired={false} labelName="Description" name="description" default={this.props.dish.description} placeholder="item description"/>
        <Input isRequired={true} labelName="Menu Position" name="index" default={this.props.dish.index + 1} placeholder="item index"/>
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
