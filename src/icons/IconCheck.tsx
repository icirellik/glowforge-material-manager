import React, { FunctionComponent } from 'react';
import { IconProps } from './IconsProps';
import './Icons.css';

export const IconCheck: FunctionComponent<IconProps> = (props: IconProps) => {
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
      title={title || 'Select'}
      type="button"
    >
      <svg
        className={className}
        style={styles}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
      </svg>
    </button>
  );
};
