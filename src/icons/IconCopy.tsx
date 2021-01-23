import React from 'react';
import { IconProps } from './IconsProps';
import './Icons.css';

export default function IconCopy(props: IconProps) {
  const styles = {
    fill: props.fill ? props.fill : 'currentColor',
    height: props.height ? props.height : '24px',
    width: props.width ? props.width : '24px',
  };

  return (
    <button
      className="icon-button"
      onClick={(props.click) ? props.click : undefined}
      title={(props.title) ? props.title : 'Copy'}
      type="button"
    >
      <svg
        className={(props.className) ? props.className : undefined}
        style={styles}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z" />
      </svg>
    </button>
  );
}
