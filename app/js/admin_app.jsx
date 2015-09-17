'use strict';

var React = require('react');
var request = require('superagent');
var Admin = require('./components/admin/form.jsx');
var cookie = require('react-cookie');
var Router = require('react-router');
var Navigation = Router.Navigation;
var $ = require('jquery');

module.exports = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {
      showSuccessAlert: false,
      showConfirmDelete: false,
      itemToDelete: { _id: '', title: '' },
      menu: [],
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
    this.deleteItem(this.state.itemToDelete._id);
  },

  handleCancel: function() {
    this.setState({showConfirmDelete: false});
  },

  showDeleteModal: function(dish) {
    this.setState({showConfirmDelete: true, itemToDelete: dish});
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
    this.setState({showSuccessAlert: true});

    setTimeout(function() {
      this.setState({showSuccessAlert: false});
    }.bind(this), 1500);
  },

  render: function() {
    var successOverlayClass = this.state.showSuccessAlert ? 'overlay visible' : 'overlay hidden';
    var deleteOverlayClass = this.state.showConfirmDelete ? 'overlay visible' : 'overlay hidden';

    return (
      <section className="admin-section">
        <a href="/">Home</a>
        <a onClick={this.logout}>Logout</a>
        <Admin menu={this.state.menu} add={this.addItem} determine={this.determineCategories} delete={this.showDeleteModal} edit={this.editItem}
          categoryOptions={this.state.chickenCategories.concat(this.state.coffeeCategories)} restaurantOptions={this.state.restaurantOptions}/>
        <div className={successOverlayClass}>
          <div className="modal-content">
            <p>Operation Successful!</p>
          </div>
        </div>
        <div className={deleteOverlayClass}>
          <div className="modal-content">
            <p>Are you sure you want to delete <span className="delete-title">{this.state.itemToDelete.title}</span> from the menu?</p>
            <button onClick={this.handleConfirm} className="modal-button warning">Yes</button>
            <button onClick={this.handleCancel} className="modal-button cancel">Cancel</button>
          </div>
        </div>
      </section>
    );
  }
});
