'use strict';

var React = require('react');
var Input = require('./input.jsx');
var Dropdown = require('./dropdown.jsx');
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function() {
    return { editing: false };
  },

  handleToggleEdit: function(evt) {
    $(evt.target)
      .parent()
      .siblings('.dish-edit-form')
      .slideToggle('fast', function() {
        this.setState({editing: !this.state.editing});
      }.bind(this));
  },

  handleSubmit: function(id, evt) {
    this.props.submit(id, evt);
    $(evt.target)
      .slideUp('fast', function() {
        this.setState({editing: false});
      }.bind(this));
  },

  handleDelete: function(id, evt) {
    this.props.delete(id, evt);
  },

  render: function() {
    var index = this.props.dish.index + 1;
    var buttonText = this.state.editing ? 'Cancel' : 'Edit';

    return (
      <section className="dish-edit-section" key={this.props.dish._id}>
        <header className="dish-edit-header">
          <h4>{index}. {this.props.dish.title}</h4>
          <button className="delete-button" onClick={this.handleDelete.bind(null, this.props.dish._id)}>Delete</button>
          <button className="toggle-edit-button" onClick={this.handleToggleEdit}>{buttonText}</button>
        </header>
        <form className="dish-edit-form" name="updateItem" onSubmit={this.handleSubmit.bind(null, this.props.dish._id)}>
          <label className="textarea_label">Description
            <textarea name="description" defaultValue={this.props.dish.description} rows="10" cols="50"></textarea>
          </label>
          <Input isRequired={true} labelName="Name" name="name" value={this.props.dish.title} placeholder="item name"/>
          <Input isRequired={true} labelName="Price" name="price" value={this.props.dish.price} placeholder="item price"/>


          <Dropdown name="restaurant" default={this.props.dish.restaurant} options={this.props.restaurantOptions}/>
          <Dropdown name="category" default={this.props.dish.category} options={this.props.categoryOptions}/>
          <button className="save-button confirm" type="submit">Save Changes</button>
        </form>
      </section>
    );
  }
});
