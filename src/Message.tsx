import React from 'react';
import './Message.css';

interface Message {
  color?: string;
  message: string;
}

class Message extends React.Component<Message> {
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

export default Message;
