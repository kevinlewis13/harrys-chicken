'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Redirect = Router.Redirect;
var NotFoundRoute = Router.NotFoundRoute;
var ChickenApp = require('./chicken_app.jsx');
var CoffeeApp = require('./coffee_app.jsx');
var FourOhFour = require('./components/site/four_oh_four.jsx');
var AdminApp = require('./admin_app.jsx');
var SignIn = require('./components/admin/sign_in.jsx');

var Client = React.createClass({
  render: function() {
    return (
      <RouteHandler/>
    );
  }
});

var routes = (
  <Route handler={Client}>
    <Route path="/chicken" handler={ChickenApp}/>
    <Route path="/coffee" handler={CoffeeApp}/>
    <Route path="/admin" handler={AdminApp}/>
    <Route path="/admin/sign_in" handler={SignIn}/>
    <Redirect from="/" to="/chicken"/>
    <NotFoundRoute handler={FourOhFour}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});
