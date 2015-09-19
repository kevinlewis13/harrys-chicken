'use strict';

var React = require('react');
var request = require('superagent');
var Admin = require('./components/admin/form.jsx');
var cookie = require('react-cookie');
var Router = require('react-router');
var Navigation = Router.Navigation;
var Modal = require('./components/admin/modal.jsx');
var $ = require('jquery');

module.exports = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {
      showSuccessAlert: false, showDeleteAlert: false, showAuthErrorAlert: false, showServerErrorAlert: false,
      itemToDelete: { _id: '', title: '' }, menu: [], operation: '',
      restaurantOptions: [
        {display: 'Chicken Joint', value: 'chicken'},
        {display: 'Coffee Joint', value: 'coffee'}
      ],
      chickenCategories: [
        {display: "Entree", value: "entrees"},
        {display: "Side", value: "sides"},
        {display: "Drink", value: "drinks"},
        {display: "Sauce", value: "sauces"}
      ],
      coffeeCategories: [
        {display: "Beverage", value: "beverages"},
        {display: "Pastry", value: "pastries"},
        {display: "Extra",  value: "extras"}
      ]
    };
  },

  componentWillMount: function() {
    var token = cookie.load('eat');

    if (!token) {
      this.transitionTo('/admin/sign_in');
    }
  },

  componentDidMount: function() {
    this.loadMenu();
  },

  logout: function(evt) {
    evt.preventDefault();

    cookie.remove('eat');
    this.transitionTo('/');
  },

  rerouteToSignIn: function() {
    cookie.remove('eat');
    this.transitionTo('/admin/sign_in');
  },

  determineCategories: function() {
    var chickenCategories = this.state.chickenCategories;
    var coffeeCategories = this.state.coffeeCategories;

    $('[name="restaurant"]').change(function() {
      var parent = $(this).val();
      var child = $(this).siblings('[name="category"]');

      switch(parent) {
        case 'chicken':
          list(chickenCategories, child);
          break;
        case 'coffee':
          list(coffeeCategories, child);
          break;
        default:
          $(child).html('');
          break;
      }
    });

    function list(arrayList, child) {
      $(child).html("");
      $(arrayList).each(function(i) {
        $(child).append('<option value="'+arrayList[i].value+'">'+arrayList[i].display+'</option>');
      });
    }

    $('[name="restaurant"]').each(function() {
      if($(this).val() === 'chicken') {
        list(chickenCategories, $(this).siblings('[name="category"]'));
      } else {
        list(coffeeCategories, $(this).siblings('[name="category"]'));
      }
    });
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

  addItem: function(item) {
    this.setState({operation: 'Create'});

    request
      .post('/api/dish')
      .send(item)
      .set('eat', cookie.load('eat'))
      .end(this.handleResponse);
  },

  editItem: function(id, item) {
    this.setState({operation: 'Update'});

    request
      .put('/api/dish/' + id)
      .send(item)
      .set('eat', cookie.load('eat'))
      .end(this.handleResponse);
  },

  deleteItem: function(id) {
    this.setState({operation: 'Delete'});

    request
      .del('/api/dish/' + id)
      .set('eat', cookie.load('eat'))
      .end(this.handleResponse);
  },

  handleResponse: function(err, res) {
    if (err) {
      switch(res.status) {
        case 401:
          this.setState({showAuthErrorAlert: true});
          break;
        case 500:
          this.setState({showServerErrorAlert: true});

          setTimeout(function() {
            this.setState({showServerErrorAlert: false});
          }.bind(this), 1500);
      }

      return console.log(err);
    }

    this.loadMenu();
    this.showSuccessAlert();
  },

  showSuccessAlert: function() {
    this.setState({showSuccessAlert: true});

    setTimeout(function() {
      this.setState({showSuccessAlert: false});
    }.bind(this), 1500);
  },

  showDeleteModal: function(dish) {
    this.setState({showDeleteAlert: true, itemToDelete: dish});
  },

  handleConfirm: function() {
    this.setState({showDeleteAlert: false});
    this.deleteItem(this.state.itemToDelete._id);
  },

  handleCancel: function() {
    this.setState({showDeleteAlert: false});
  },

  render: function() {
    var successMessage = this.state.operation + ' successful!';
    var itemToDeleteHTML = (
      <span key={this.state.itemToDelete._id} className="delete-title">
        {this.state.itemToDelete.title}
      </span>
    );

    return (
      <section className="admin-section">
        <a href="/">Home</a>
        <a onClick={this.logout}>Logout</a>
        <Admin menu={this.state.menu} add={this.addItem} determine={this.determineCategories}
          delete={this.showDeleteModal} edit={this.editItem}
          categoryOptions={this.state.chickenCategories.concat(this.state.coffeeCategories)}
          restaurantOptions={this.state.restaurantOptions}/>
        <Modal visible={this.state.showAuthErrorAlert}
          message="It looks like you've been logged out. Please sign back in."
          confirmButton={{text: 'Sign In', action: this.rerouteToSignIn}}/>
        <Modal visible={this.state.showSuccessAlert} message={successMessage}/>
        <Modal visible={this.state.showServerErrorAlert}
          message="Oops there was a problem with the server! Please try again."/>
        <Modal visible={this.state.showDeleteAlert}
          message={["Are you sure you want to delete ", itemToDeleteHTML, " from the menu?"]}
          confirmButton={{text: 'Yes', action: this.handleConfirm, class: 'modal-button warning'}}
          cancelButton={{text: 'No', action: this.handleCancel}}/>
      </section>
    );
  }
});
