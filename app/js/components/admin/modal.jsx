'use strict';

var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return { visible: this.props.visible };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({visible: nextProps.visible});
  },

  render: function() {
    var overlayClass = this.state.visible ? 'overlay visible' : 'overlay hidden';
    var confirmButton;
    var cancelButton;

    if (this.props.confirmButton) {
      confirmButton = (
        <button className={this.props.confirmButton.class || "button"}
          onClick={this.props.confirmButton.action}>{this.props.confirmButton.text}
        </button>
      );
    }

    if (this.props.cancelButton) {
      cancelButton = (
        <button className="button"
          onClick={this.props.cancelButton.action}>{this.props.cancelButton.text}
        </button>
      );
    }

    return (
      <div className={overlayClass}>
        <div className="modal-content">
          <p>{this.props.message}</p>
          {confirmButton}
          {cancelButton}
        </div>
      </div>
    );
  }
});
