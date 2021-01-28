import React, { FunctionComponent } from 'react';
import type { IconProps } from './IconsProps';
import { DEFAULT_ICON_STYLES } from './IconsShared';
import './Icons.css';

export const IconSync: FunctionComponent<IconProps> = (props: IconProps) => {
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
      title={title || 'Sync'}
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
        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
      </svg>
    </button>
  );
};
