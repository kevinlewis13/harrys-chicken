'use strict';

var React = require('react');
var request = require('superagent');
var Admin = require('./components/admin/form.jsx');
var cookie = require('react-cookie');
var Router = require('react-router');
var Navigation = Router.Navigation;

module.exports = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {
      showAlert: false,
      showConfirmDelete: false,
      currentItem: null,
      menu: [],
      categoryOptions: [
        {value: 'entrees', name: 'Entree'},
        {value: 'sides', name: 'Side'},
        {value: 'sauces', name: 'Sauce'},
        {value: 'drinks', name: 'Drink'},
        {value: 'beverages', name: 'Beverage'},
        {value: 'pastries', name: 'Pastry'},
        {value: 'extras', name: 'Extra'}
      ],
      restaurantOptions: [
        {value: 'chicken', name: 'Chicken Joint'},
        {value: 'coffee', name: 'Coffee Joint'}
      ]
    };
  },

  componentWillMount: function() {
    var token = cookie.load('eat');

    if (!token) {
      this.transitionTo('/admin/sign_in');
    }
  },

  logout: function(evt) {
    evt.preventDefault();

    cookie.remove('eat');
    this.transitionTo('/');
  },

  componentDidMount: function() {
    this.loadMenu();
  },

  loadMenu: function() {
    request
      .get('/api/menu')
      .end(function(err, res) {
        if (err) {
          return console.log(err);
        }

        this.setState({menu: res.body});
      }.bind(this));
  },

  handleConfirm: function() {
    this.setState({showConfirmDelete: false});
    this.deleteItem(this.state.currentItem);
  },

  handleCancel: function() {
    this.setState({showConfirmDelete: false});
  },

  showDeleteModal: function(id) {
    this.setState({showConfirmDelete: true, currentItem: id});
  },

  deleteItem: function(id) {
    request
      .del('/api/dish/' + id)
      .set('eat', cookie.load('eat'))
      .end(function(err, res) {
        if (err) {
          return console.log(err);
        }

        this.loadMenu();
      }.bind(this));
  },

  addItem: function(item) {
    request
      .post('/api/dish')
      .send(item)
      .set('eat', cookie.load('eat'))
      .end(function(err, res) {
        if (err) {
          return console.log(err);
        }

        this.loadMenu();
        this.showSuccessAlert();
      }.bind(this));
  },

  editItem: function(id, item) {
    request
      .put('/api/dish/' + id)
      .send(item)
      .set('eat', cookie.load('eat'))
      .end(function(err, res) {
        if (err) {
          return console.log(err);
        }

        this.loadMenu();
        this.showSuccessAlert();
      }.bind(this));
  },

  showSuccessAlert: function() {
    this.setState({showAlert: true});

    setTimeout(function() {
      this.setState({showAlert: false});
    }.bind(this), 1500);
  },

  render: function() {
    var successOverlayClass = this.state.showAlert ? 'overlay visible' : 'overlay hidden';
    var deleteOverlayClass = this.state.showConfirmDelete ? 'overlay visible' : 'overlay hidden';

    return (
      <section className="admin-section">
        <a href="/">Home</a>
        <a onClick={this.logout}>Logout</a>
        <Admin menu={this.state.menu} add={this.addItem} delete={this.showDeleteModal} edit={this.editItem}
          categoryOptions={this.state.categoryOptions} restaurantOptions={this.state.restaurantOptions}/>
        <div className={successOverlayClass}>
          <div className="modal-content">
            <p>Operation Successful!</p>
          </div>
        </div>
        <div className={deleteOverlayClass}>
          <div className="modal-content">
            <p>Are you sure you want to delete this item?</p>
            <button onClick={this.handleConfirm} className="modal-button warning">Yes</button>
            <button onClick={this.handleCancel} className="modal-button cancel">Cancel</button>
          </div>
        </div>
      </section>
    );
  }
});
