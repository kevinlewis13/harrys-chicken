'use strict';

var React = require('react');
var Input = require('./input.jsx');
var Dropdown = require('./dropdown.jsx');
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function() {
    return { editing: false };
  },

  getForm: function(evt) {
    return $(evt.target).parent().siblings('.dish-edit-form');
  },

  handleToggleEdit: function(evt) {
    this.getForm(evt)
      .slideToggle('fast', function() {
        this.setState({editing: !this.state.editing});
      }.bind(this)).parent().toggleClass('form-visible');
  },

  handleUpdate: function(id, evt) {
    evt.preventDefault();
    var form = this.getForm(evt)[0];

    this.handleToggleEdit(evt);
    this.props.update(id, form);
  },

  handleDelete: function(id, evt) {
    this.props.delete(id, evt);
  },

  handleFormAction: function(id, evt) {
    if (this.state.editing) {
      this.handleUpdate(id, evt);
    } else {
      this.handleDelete(id, evt);
    }
  },

  render: function() {
    var index = this.props.dish.index + 1;
    var editButtonText = this.state.editing ? 'Cancel' : 'Edit';
    var saveDeleteButtonText = this.state.editing ? 'Save' : 'Delete';
    var saveDeleteButtonClass = this.state.editing ? 'save-button confirm' : 'delete-button';

    return (
      <section className="dish-edit-section" key={this.props.dish._id}>
        <header className="dish-edit-header">
          <h4>{index}. {this.props.dish.title}</h4>
          <button className={saveDeleteButtonClass} onClick={this.handleFormAction.bind(null, this.props.dish._id)}>{saveDeleteButtonText}</button>
          <button className="toggle-edit-button" onClick={this.handleToggleEdit}>{editButtonText}</button>
        </header>
        <form className="dish-edit-form" name="updateItem">
          <div className="form-left">
            <Input isRequired={true} labelName="Name" name="name" value={this.props.dish.title} placeholder="item name"/>
            <Input isRequired={true} labelName="Price" name="price" value={this.props.dish.price} placeholder="item price"/>
            <Input isRequired={true} labelName="Menu Position" name="index" value={index} placeholder="item index"/>
          </div>
          <div className="form-right">
            <label className="textarea-label">Description
              <textarea name="description" defaultValue={this.props.dish.description} rows="5" cols="43"></textarea>
            </label>
            <Dropdown name="restaurant" default={this.props.dish.restaurant} options={this.props.restaurantOptions}/>
            <Dropdown name="category" default={this.props.dish.category} options={this.props.categoryOptions}/>
          </div>
        </form>
      </section>
    );
  }
});
