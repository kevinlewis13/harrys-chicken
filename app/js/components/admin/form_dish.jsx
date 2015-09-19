'use strict';

var React = require('react');
var Input = require('./input.jsx');
var Dropdown = require('./dropdown.jsx');
var Textarea = require('./textarea.jsx');
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function() {
    return { editing: false };
  },

  getForm: function(evt) {
    return $(evt.target).parent().siblings('.dish-edit-form');
  },

  handleToggleEdit: function(evt) {
    var $formEl = this.getForm(evt);

    if (!this.state.editing) {
      $formEl
        .slideDown('fast', function() {
          this.setState({editing: true});
        }.bind(this)).parent().addClass('form-visible');
    } else {
      $formEl
        .slideUp('fast', function() {
          this.setState({editing: false});
          $formEl.parent().removeClass('form-visible');
        }.bind(this));
    }
  },

  handleUpdate: function(dish, evt) {
    var updatedItem = this.props.buildItem(this.getForm(evt)[0]);

    this.handleToggleEdit(evt);
    this.props.update(dish._id, updatedItem);
  },

  handleDelete: function(dish) {
    this.props.delete(dish);
  },

  handleFormAction: function(dish, evt) {
    evt.preventDefault();

    if (this.state.editing) {
      this.handleUpdate(dish, evt);
    } else {
      this.handleDelete(dish);
    }
  },

  componentDidMount: function() {
    this.props.determine();
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
          <button className={saveDeleteButtonClass} onClick={this.handleFormAction.bind(null, this.props.dish)}>{saveDeleteButtonText}</button>
          <button className="toggle-edit-button" onClick={this.handleToggleEdit}>{editButtonText}</button>
        </header>
        <form className="dish-edit-form" name="updateItem">
          <div className="form-left">
            <Input isRequired={true} labelName="Name" name="name" value={this.props.dish.title} placeholder="Item name"/>
            <Input isRequired={true} labelName="Price" name="price" value={this.props.dish.price} placeholder="Item price"/>
            <Input isRequired={true} labelName="Menu Position" name="index" value={index} placeholder="Item index"/>
          </div>
          <div className="form-right">
            <Textarea labelName="Description" default={this.props.dish.description}
              placeholderText="Item description" rows="5" cols="43" name="description"/>
            <Dropdown name="restaurant" default={this.props.dish.restaurant} options={this.props.restaurantOptions}/>
            <Dropdown name="category" default={this.props.dish.category} options={this.props.categoryOptions}/>
          </div>
        </form>
      </section>
    );
  }
});
