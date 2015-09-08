'use strict';

var React = require('react');
var Input = require('./input.jsx');
var Dropdown = require('./dropdown.jsx');
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function() {
    return { editing: false, dish: this.props.dish };
  },

  handleToggleEdit: function(evt) {
    $(evt.target).parent().siblings('.dish-edit-form').slideToggle('fast');
    this.setState({editing: !this.state.editing});
  },

  handleSubmit: function(id, evt) {
    this.props.submit(id, evt);
    $(evt.target).slideUp('fast');
    this.setState({editing: !this.state.editing});
  },

  handleDelete: function(id, evt) {
    this.props.delete(id, evt);
  },

  render: function() {
    var index = this.state.dish.index + 1;
    var buttonText = this.state.editing ? 'Cancel' : 'Edit';

    return (
      <section className="dish-edit-section" key={this.props.dish._id}>
        <header className="dish-edit-header">
          <h4>{index}. {this.props.dish.title}</h4>
          <button onClick={this.handleToggleEdit} className="toggle-edit-button">{buttonText}</button>
        </header>
        <form className="dish-edit-form" name="updateItem" key={this.props.dish._id}
          onSubmit={this.handleSubmit.bind(null, this.props.dish._id)}>
          <Input isRequired={true} labelName="Name" name="name" default={this.state.dish.title} placeholder="item name"/>
          <Input isRequired={true} labelName="Price" name="price" default={this.state.dish.price} placeholder="item price"/>
          <Input isRequired={false} labelName="Description" name="description" default={this.state.dish.description} placeholder="item description"/>
          <Input isRequired={true} labelName="Menu Position" name="index" default={index} placeholder="item index"/>
          <DropDown name="restaurant" default={this.state.dish.restaurant} options={this.props.restaurantOptions} />
          <DropDown name="category" default={this.state.dish.category} options={this.props.categoryOptions} />
          <button className="save-button" type="submit">Save Changes</button>
          <button className="delete-button" onClick={this.handleDelete.bind(null, this.props.dish._id)}>Delete Item</button>
        </form>
      </section>
    );
  }
});
