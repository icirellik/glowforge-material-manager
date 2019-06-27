import React from 'react';
import './Message.css';
import IconClear from './icons/IconClear';

type MessageProps = {
  clearMessage: (event: React.MouseEvent) => void;
  color?: string | null;
  message: string;
}

export default function Message(props: MessageProps) {
  if (props.message && props.message.length > 0) {
    let styles;
    if (props.color) {
      styles = {
        color: props.color,
      };
    }
    return (
      <div className="message-box__container" style={styles}>
        <span className="message-box__message">{props.message}</span>
        <div className="message-box__close">
          <IconClear click={props.clearMessage} title="Dismiss" />
        </div>
      </div>
    );
  }
  return null;
};
