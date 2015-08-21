'use strict';

var React = require('react');
var request = require('superagent');
var Header = require('./components/header.jsx');
var Banner = require('./components/banner.jsx');
var Info = require('./components/info.jsx');
var Menu = require('./components/menu.jsx');
var About = require('./components/about.jsx');
var Footer = require('./components/footer.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    var coffeeDetails = {
      restaurantInfo: {
        name: 'Harry\'s Coffee Joint',
        phone: '206.938.9000',
        address: '6032 California Ave SW\nSeattle, WA 98136',
        hours: 'Tuesday - Saturday, 9-3pm'
      },
      bannerInfo: {
        partner: 'Harry\'s Chicken Joint',
        partnerUrl: '/chicken'
      },
      socialInfo: {
        facebookUrl: 'https://www.facebook.com/pages/Harrys-Chicken-Joint/459035090821127',
        tumblrUrl: 'http://harryschickenjointseattle.tumblr.com/'
      },
      menuInfo: {
        categories: ['beverages', 'baked_goods', 'extras']
      }
    };

    return {
      menu: [],
      restaurantInfo: coffeeDetails.restaurantInfo,
      bannerInfo: coffeeDetails.bannerInfo,
      socialInfo: coffeeDetails.socialInfo
    };
  },

  componentDidMount: function() {
    this.loadMenu();
  },

  loadMenu: function() {
    request
      .get('api/menu')
      .end(function(err, res) {
        if (err) {
          return console.log(err);
        }

        this.setState({menu: res.body});
      }.bind(this));
  },

  render: function() {
    return (
      <main className="main">
        <Header headerInfo={this.state.restaurantInfo}/>
        <Banner bannerInfo={this.state.bannerInfo}/>
        <Info restaurantInfo={this.state.restaurantInfo}/>
        <Menu menu={this.state.menu}/>
        <About/>
        <Footer socialInfo={this.state.socialInfo}/>
      </main>
    );
  }
});
