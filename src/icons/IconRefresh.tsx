import React from 'react';
import { IconProps } from './IconsProps';
import './Icons.css';

export default function IconRefresh(props: IconProps) {
  const styles = {
    fill: props.fill ? props.fill : 'currentColor',
    height: props.height ? props.height : "24px",
    width: props.width ? props.width : "24px",
  };

  return (
    <button
      className="icon-button"
      onClick={(props.click) ? props.click : undefined}
      title={(props.title) ? props.title : 'Refresh'}
    >
      <svg
        className={(props.className) ? props.className : undefined}
        style={styles} xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
      </svg>
    </button>
  );
}
