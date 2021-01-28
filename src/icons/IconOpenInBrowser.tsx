import React, { FunctionComponent } from 'react';
import { IconProps } from './IconsProps';
import './Icons.css';

export const IconOpenInBrowser: FunctionComponent<IconProps> = (props: IconProps) => {
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
      title={title || 'Edit'}
      type="button"
    >
      <svg
        className={className}
        style={styles}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z" />
      </svg>
    </button>
  );
};
