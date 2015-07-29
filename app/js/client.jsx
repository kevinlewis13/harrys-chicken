'use strict';

var React = require('react');
var request = require('superagent');
var Header = require('./components/header.jsx');
var Info = require('./components/info.jsx');
var Menu = require('./components/menu.jsx');
var Footer = require('./components/footer.jsx');
var Banner = require('./components/banner.jsx');
var About = require('./components/about.jsx');

var App = React.createClass({
  getInitialState: function() {
    var chickenDetails = {
      name: 'Harry\'s Chicken Joint',
      phone: '206.938.9000',
      address: '6032 California Ave SW, Seattle, WA 98136',
      hours: 'Tuesday - Saturday, 4-8pm',
      facebookUrl: 'https://www.facebook.com/pages/Harrys-Chicken-Joint/459035090821127',
      tumblrUrl: 'http://harryschickenjointseattle.tumblr.com/',
      partner: 'Harry\'s Coffee Joint',
      partnerUrl: 'www.amazon.com'
    };

    return { menu: [], details: chickenDetails };
  },

  componentDidMount: function() {
    this.loadMenu();
  },

  loadMenu: function() {
    request
      .get('api/menu')
      .end(function(err, res) {
        if (err) return console.log(err);

        this.setState({menu: res.body});
      }.bind(this));
  },

  render: function() {
    return (
      <main className="main">
        <Header/>
        <Banner details={this.state.details} />
        <Info details={this.state.details}/>
        <Menu menu={this.state.menu}/>
        <About />
        <Footer details={this.state.details} />
      </main>
    );
  }
});

React.render(<App/>, document.body);
