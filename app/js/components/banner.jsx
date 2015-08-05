'use strict';

var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    var partner = this.props.bannerInfo.partner;
    var partnerUrl = this.props.bannerInfo.partnerUrl;

    return { partner: partner, partnerUrl: partnerUrl };
  },

  render: function() {
    return (
      <article className="slab banner">
        <section className="content banner">
          <h3>We're partnered with {this.state.partner}!</h3>
          <a className="button" href={this.state.partnerUrl}>Check out our sister site!</a>
        </section>
      </article>
    );
  }
});
