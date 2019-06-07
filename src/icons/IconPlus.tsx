import React from 'react';
import { IconProps } from './Icons';
import './Icons.css';

export default function IconPlus(props: IconProps) {
  const styles = {
    fill: props.fill ? props.fill : 'currentColor',
    height: props.height ? props.height : "24px",
    width: props.width ? props.width : "24px",
  };

  return (
    <button
      className="icon-button"
      onClick={(props.click) ? props.click : undefined}
      title="Plus"
    >
      <svg style={styles} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      </svg>
    </button>
  );
}
