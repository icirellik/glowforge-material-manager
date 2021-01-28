import React, { FunctionComponent } from 'react';
import type { IconProps } from './IconsProps';
import { DEFAULT_ICON_STYLES } from './IconsShared';
import './Icons.css';

export const IconDeleteForever: FunctionComponent<IconProps> = (props: IconProps) => {
  const {
    className,
    buttonClassName,
    click,
    fill,
    height,
    text,
    title,
    width,
  } = props;

  const buttonClasses = `icon-button ${buttonClassName}`;

  return (
    <button
      className={buttonClasses}
      onClick={click}
      title={title || 'Delete'}
      type="button"
    >
      <svg
        className={className}
        style={{
          ...DEFAULT_ICON_STYLES,
          ...{
            fill,
            height,
            width,
          },
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
      </svg>
      {text}
    </button>
  );
};
