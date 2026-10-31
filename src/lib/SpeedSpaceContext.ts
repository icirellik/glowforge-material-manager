import React from 'react';
import { DEFAULT_SPEED_SPACE } from './glowforgeUnits';
import type { SpeedSpace } from './glowforgeUnits';

/**
 * The speed limits of the selected machine, which speeds are shown in.
 */
export const SpeedSpaceContext =
  React.createContext<SpeedSpace>(DEFAULT_SPEED_SPACE);
