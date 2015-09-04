'use strict';

var React = require('react');
var Input = require('./input.jsx');
var DropDown = require('./select.jsx');

module.exports = React.createClass({
  handleSubmit: function(id, evt) {
    this.props.submit(id, evt);
  },

  handleDelete: function(id, evt) {
    this.props.delete(id, evt);
  },

  render: function() {
    return (
      <form name="updateItem" key={this.props.dish._id}
        onSubmit={this.handleSubmit.bind(null, this.props.dish._id)}>
        <Input isRequired={true} labelName="Name" name="name" default={this.props.dish.title} placeholder="item name"/>
        <Input isRequired={true} labelName="Price" name="price" default={this.props.dish.price} placeholder="item price"/>
        <Input isRequired={false} labelName="Description" name="description" default={this.props.dish.description} placeholder="item description"/>
        <Input isRequired={true} labelName="Menu Position" name="index" default={this.props.dish.index + 1} placeholder="item index"/>
        <DropDown name="restaurant" default={this.props.dish.restaurant} options={this.props.restaurantOptions} />
        <DropDown name="category" default={this.props.dish.category} options={this.props.categoryOptions} />
        <button type="submit">Save Changes</button>
        <button onClick={this.handleDelete.bind(null, this.props.dish._id)}>Delete Item</button>
      </form>
    );
  }
});
