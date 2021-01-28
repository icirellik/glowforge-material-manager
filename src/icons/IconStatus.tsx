import React, { FunctionComponent } from 'react';
import type { IconProps } from './IconsProps';
import { DEFAULT_ICON_STYLES } from './IconsShared';
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

  return (
    <button
      className="icon-button"
      onClick={click}
      title={title || 'Status'}
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
        viewBox="0 0 20 20"
      >
        <path d="M9.875,0.625C4.697,0.625,0.5,4.822,0.5,10s4.197,9.375,9.375,9.375S19.25,15.178,19.25,10S15.053,0.625,9.875,0.625" />
      </svg>
    </button>
  );
};
