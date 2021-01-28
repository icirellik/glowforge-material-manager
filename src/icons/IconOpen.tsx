import React, { FunctionComponent } from 'react';
import type { IconProps } from './IconsProps';
import { DEFAULT_ICON_STYLES } from './IconsShared';
import './Icons.css';

export const IconOpen: FunctionComponent<IconProps> = (props: IconProps) => {
  const {
    className,
    click,
    fill,
    height,
    title,
    width,
  } = props;

  return (
    <button
      className="icon-button"
      onClick={click}
      title={title || 'Open'}
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
        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
      </svg>
    </button>
  );
};
