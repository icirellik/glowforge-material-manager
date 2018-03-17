import React from 'react';
import PropTypes from 'prop-types';
import './Message.css';

class Message extends React.Component {
  render() {
    if (this.props.message && this.props.message.length > 0) {
      return (
        <p className="Message-box">
          {this.props.message}
        </p>
      );
    }
    return null;
  }
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Message;
