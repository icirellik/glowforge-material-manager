import React from 'react';
import { IconProps } from './IconsProps';
import './Icons.css';

export default function IconOpen(props: IconProps) {
  const styles = {
    fill: props.fill ? props.fill : 'currentColor',
    height: props.height ? props.height : "24px",
    width: props.width ? props.width : "24px",
  };

  return (
    <button
      className="icon-button"
      onClick={(props.click) ? props.click : undefined}
      title={(props.title) ? props.title : 'Open'}
    >
      <svg
        className={(props.className) ? props.className : undefined}
        style={styles} xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
      </svg>
    </button>
  );
}
