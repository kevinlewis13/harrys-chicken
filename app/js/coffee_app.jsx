'use strict';

var React = require('react');
var request = require('superagent');
var Header = require('./components/site/header.jsx');
var Banner = require('./components/site/banner.jsx');
var Info = require('./components/site/info.jsx');
var Menu = require('./components/site/menu.jsx');
var About = require('./components/site/about.jsx');
var Footer = require('./components/site/footer.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    var coffeeDetails = {
      restaurantInfo: {
        name: 'Harry\'s Coffee Joint',
        phone: '206.938.9000',
        address: '6032 California Ave SW\nSeattle, WA 98136',
        hours: 'Monday - Friday, 7-2pm'
      },
      bannerInfo: {
        partner: 'Harry\'s Chicken Joint',
        partnerUrl: '/chicken',
        partnerAbbrev: 'chicken',
        category: ['specials']
      },
      socialInfo: {
        facebookUrl: 'https://www.facebook.com/Harryscoffeejoint',
        tumblrUrl: 'http://harryschickenjointseattle.tumblr.com/'
      },
      menuInfo: {
        categories: ['beverages', 'pastries', 'extras']
      }
    };

    return {
      menu: [],
      restaurantInfo: coffeeDetails.restaurantInfo,
      bannerInfo: coffeeDetails.bannerInfo,
      socialInfo: coffeeDetails.socialInfo,
      menuInfo: coffeeDetails.menuInfo
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
      <main>
        <Header headerInfo={this.state.restaurantInfo} partnerInfo={this.state.bannerInfo}/>
        <Banner bannerInfo={this.state.bannerInfo} menu={this.state.menu}/>
        <Info restaurantInfo={this.state.restaurantInfo}/>
        <Menu menu={this.state.menu} categories={this.state.menuInfo.categories}/>
        <About/>
        <Footer socialInfo={this.state.socialInfo}/>
      </main>
    );
  }
});
