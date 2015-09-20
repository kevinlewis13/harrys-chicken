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
      showDeleteAlert: false,
      showAuthErrorAlert: false,
      showServerErrorAlert: false,
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

  rerouteToSignIn: function() {
    cookie.remove('eat');
    this.transitionTo('/admin/sign_in');
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
    this.setState({showDeleteAlert: false});
    this.deleteItem(this.state.itemToDelete._id);
  },

  handleCancel: function() {
    this.setState({showDeleteAlert: false});
  },

  showDeleteModal: function(dish) {
    this.setState({showDeleteAlert: true, itemToDelete: dish});
  },

  deleteItem: function(id) {
    request
      .del('/api/dish/' + id)
      .set('eat', cookie.load('eat'))
      .end(function(err, res) {
        if (err) {
          return this.handleError(err, res);
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
          return this.handleError(err, res);
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
          return this.handleError(err, res);
        }

        this.loadMenu();
        this.showSuccessAlert();
      }.bind(this));
  },

  handleError: function(err, res) {
    console.log(err);
    if (res.status === 401) this.setState({showAuthErrorAlert: true});
    if (res.status === 500) {
      this.setState({showServerErrorAlert: true});

      setTimeout(function() {
        this.setState({showServerErrorAlert: false});
      }.bind(this), 1500);
    }
  },

  showSuccessAlert: function() {
    this.setState({showSuccessAlert: true});

    setTimeout(function() {
      this.setState({showSuccessAlert: false});
    }.bind(this), 1500);
  },

  render: function() {
    var successOverlayClass = this.state.showSuccessAlert ? 'overlay visible' : 'overlay hidden';
    var deleteOverlayClass = this.state.showDeleteAlert ? 'overlay visible' : 'overlay hidden';
    var authErrorOverlayClass = this.state.showAuthErrorAlert ? 'overlay visible' : 'overlay hidden';
    var serverErrorOverlayClass = this.state.showServerErrorAlert ? 'overlay visible' : 'overlay hidden';

    return (
      <main>
        <header className="content">
          <nav>
            <a href="/">Home</a>
            <a onClick={this.logout}>Logout</a>
          </nav>
        </header>
        <Admin menu={this.state.menu} add={this.addItem} determine={this.determineCategories} delete={this.showDeleteModal} edit={this.editItem}
          categoryOptions={this.state.chickenCategories.concat(this.state.coffeeCategories)} restaurantOptions={this.state.restaurantOptions}/>
        <div className={authErrorOverlayClass}>
          <div className="modal-content">
            <p>It looks like you've been logged out. Please sign back in</p>
            <button onClick={this.rerouteToSignIn} className="modal-button">Sign in</button>
          </div>
        </div>
        <div className={successOverlayClass}>
          <div className="modal-content">
            <p>Operation Successful!</p>
          </div>
        </div>
        <div className={serverErrorOverlayClass}>
          <div className="modal-content">
            <p>Oops there was a problem with the server! Please try again.</p>
          </div>
        </div>
        <div className={deleteOverlayClass}>
          <div className="modal-content">
            <p>Are you sure you want to delete <span className="emphasis">{this.state.itemToDelete.title}</span> from the menu?</p>
            <button onClick={this.handleConfirm} className="button warning">Yes</button>
            <button onClick={this.handleCancel} className="button">Cancel</button>
          </div>
        </div>
      </main>
    );
  }
});
