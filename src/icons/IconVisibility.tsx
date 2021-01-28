import React, { FunctionComponent } from 'react';
import { IconProps } from './IconsProps';
import './Icons.css';

export const IconVisibility: FunctionComponent<IconProps> = (props: IconProps) => {
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
      title={title || 'Visibility'}
      type="button"
    >
      <svg
        className={className}
        style={styles}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
      </svg>
    </button>
  );
};
