import React from 'react';
import { IconClear } from './icons/IconClear';
import { ClearMessage } from './App';
import './Message.css';

type MessageProps = {
  backgroundColor?: string;
  clearMessage: ClearMessage;
  color?: string;
  message: string;
}

interface MessageStyle {
  backgroundColor?: string;
  color?: string;
}

export default function Message(props: MessageProps) {
  const { message } = props;
  if (message && message.length > 0) {
    const styles: MessageStyle = {};
    if (props.color) {
      styles.color = props.color;
    }
    if (props.backgroundColor) {
      styles.backgroundColor = props.backgroundColor;
    }
    return (
      <div className="message-box__container" style={styles}>
        <span className="message-box__message">{props.message}</span>
        <div className="message-box__close">
          <IconClear
            click={() => { props.clearMessage(); }}
            title="Dismiss"
          />
        </div>
      </div>
    );
  }
  return null;
}
