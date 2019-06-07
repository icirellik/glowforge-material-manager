import React from 'react';
import { IconProps } from './IconsProps';
import './Icons.css';

export default function IconEdit(props: IconProps) {
  const styles = {
    fill: props.fill ? props.fill : 'currentColor',
    height: props.height ? props.height : "24px",
    width: props.width ? props.width : "24px",
  };

  return (
    <button
      className="icon-button"
      onClick={(props.click) ? props.click : undefined}
      title={(props.title) ? props.title : 'Edit'}
    >
      <svg
        className={(props.className) ? props.className : undefined}
        style={styles} xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
      </svg>
    </button>
  );
}
