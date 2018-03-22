import React from 'react';
import PropTypes from 'prop-types';
import './Message.css';

class Message extends React.Component {
  render() {
    if (this.props.message && this.props.message.length > 0) {
      let styles;
      if (this.props.color) {
        styles = {
          color: this.props.color,
        };
      }
      return (
        <p className="Message-box" style={styles}>
          {this.props.message}
        </p>
      );
    }
    return null;
  }
}

Message.propTypes = {
  color: PropTypes.string,
  message: PropTypes.string.isRequired,
};

export default Message;
