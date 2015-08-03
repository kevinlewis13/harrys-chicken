'use strict';

var React = require('react');
var Menu = require('./menu.jsx');

module.exports = React.createClass({
  renderOrigMenuForms: function() {
    //mapping statement to return form w/ inputs with vals of props of initial menu, save button, and delete button
  }

  getInitialState: function() {
    //why is this returning empty to start with? async? weird, right?
    return {origMenu: this.props.initialMenu};
  },

  componentDidMount: function() {
    console.log(this.props.initialMenu);
    console.log(this.state.origMenu);
  },

  handleSubmit: function(evt) {
    evt.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var price = parseFloat(React.findDOMNode(this.refs.price).value.trim());
    var description = React.findDOMNode(this.refs.description).value.trim();
    var restaurant = React.findDOMNode(this.refs.restaurant).value;
    var category = React.findDOMNode(this.refs.category).value;
    var newItem = {restaurant: restaurant, title: name, price: price, description: description, category: category};
    this.setState({origMenu: this.props.initialMenu});
    console.log(this.state.origMenu);
    console.log(this.props.initialMenu);
    this.state.origMenu.push(newItem);
    this.props.add(newItem);

  },

  render: function() {
    return (
      <article className="slab form">
        <section className="content form">
          <form onSubmit={this.handleSubmit}>
            <select name="restaurant" ref="restaurant">
              <option value="chicken">Chicken Joint</option>
              <option value="coffee">Coffee Joint</option>
            </select>
            <select name="category" ref="category">
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
        <section>
          <ul>
            {this.renderOrigMenuForms}
          </ul>
        </section>
      </article>
    );
  }
});
