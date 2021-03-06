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
    var chickenDetails = {
      restaurantInfo: {
        name: 'Harry\'s Chicken Joint',
        phone: '206.938.9000',
        address: '6032 California Ave SW\nSeattle, WA 98136',
        hours: 'Tuesday - Thursday, 5-8pm\nFriday - Saturday, 4-8pm'
      },
      bannerInfo: {
        partner: 'Harry\'s Coffee Joint',
        partnerUrl: '/coffee',
        partnerAbbrev: 'coffee'
      },
      socialInfo: {
        facebookUrl: 'https://www.facebook.com/pages/Harrys-Chicken-Joint/459035090821127',
        tumblrUrl: 'http://harryschickenjointseattle.tumblr.com/'
      },
      menuInfo: {
        categories: ['entrees', 'sides', 'sauces', 'drinks']
      }
    };

    return {
      menu: [],
      menuInfo: chickenDetails.menuInfo,
      restaurantInfo: chickenDetails.restaurantInfo,
      bannerInfo: chickenDetails.bannerInfo,
      socialInfo: chickenDetails.socialInfo
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
        <Banner bannerInfo={this.state.bannerInfo}/>
        <Info restaurantInfo={this.state.restaurantInfo}/>
        <Menu menu={this.state.menu} categories={this.state.menuInfo.categories}/>
        <About/>
        <Footer socialInfo={this.state.socialInfo}/>
      </main>
    );
  }
});
