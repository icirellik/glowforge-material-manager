import React, { FunctionComponent } from 'react';
import { IconProps } from './IconsProps';
import './Icons.css';

export const IconStatus: FunctionComponent<IconProps> = (props: IconProps) => {
  const {
    className,
    click,
    fill,
    height,
    title,
    width,
  } = props;

  const styles = {
    fill: fill || 'currentColor',
    height: height || '24px',
    width: width || '24px',
  };

  return (
    <button
      className="icon-button"
      onClick={click}
      title={title || 'Status'}
      type="button"
    >
      <svg
        className={className}
        style={styles}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.875,0.625C4.697,0.625,0.5,4.822,0.5,10s4.197,9.375,9.375,9.375S19.25,15.178,19.25,10S15.053,0.625,9.875,0.625" />
      </svg>
    </button>
  );
};
