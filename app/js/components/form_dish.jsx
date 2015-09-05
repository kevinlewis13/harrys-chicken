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
    // <Input isRequired={false} labelName="Description" name="description" default={this.props.dish.description} placeholder="item description"/>
    return (
      <form name="updateItem" key={this.props.dish._id}
        onSubmit={this.handleSubmit.bind(null, this.props.dish._id)}>
        <fieldset className="textarea_fields">
          <label className="textarea_label">Description
            <textarea name="description" defaultValue={this.props.dish.description} rows="10" cols="50"></textarea>
          </label>
        </fieldset>
        <fieldset className="input_fields">
          <Input isRequired={true} labelName="Name" name="name" default={this.props.dish.title} placeholder="item name"/>
          <Input isRequired={true} labelName="Price" name="price" default={this.props.dish.price} placeholder="item price"/>
          <Input isRequired={true} labelName="Menu Position" name="index" default={this.props.dish.index + 1} placeholder="item index"/>
        </fieldset>
        <fieldset className="select_fields">
          <DropDown name="restaurant" default={this.props.dish.restaurant} options={this.props.restaurantOptions} />
          <DropDown name="category" default={this.props.dish.category} options={this.props.categoryOptions} />
        </fieldset>
        <fieldset className="button_fields">
          <button type="submit">Save Changes</button>
          <button onClick={this.handleDelete.bind(null, this.props.dish._id)}>Delete Item</button>
        </fieldset>
      </form>
    );
  }
});
