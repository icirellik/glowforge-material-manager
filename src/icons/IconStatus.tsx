import React from 'react';
import { IconProps } from './Icons';
import './Icons.css';

export default function IconStatus(props: IconProps) {
  const styles = {
    fill: props.fill ? props.fill : 'currentColor',
    height: props.height ? props.height : "24px",
    width: props.width ? props.width : "24px",
  };

  return (
    <button
      className="icon-button"
      onClick={(props.click) ? props.click : undefined}
      title="Status"
    >
      <svg style={styles} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.875,0.625C4.697,0.625,0.5,4.822,0.5,10s4.197,9.375,9.375,9.375S19.25,15.178,19.25,10S15.053,0.625,9.875,0.625"></path>
      </svg>
    </button>
  );
}
