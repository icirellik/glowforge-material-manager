/**
 * This file contains the type information that conforms to the matieral shape
 * that Glowforge uses in their UI.
 */

/**
 * Assumed to be the production environment that the material is available in.
 *
 * Known values:
 *  production
 *  test
 */
export type GFMaterialEnvironment = 'production';

/**
 * The different tube types that the material will work with.
 *
 * TODO: Is there a `plus` tube type.
 */
export type GFMaterialTubeType = 'basic' | 'pro';

export type GFMaterial = {
  // Format: `Custom:0`
  id: string;
  // Material thickness in mm
  nominal_thickness: null | number;
  // Format: any string
  sku: string;
  // Format: any string
  thickness_name: string;
  // Format: any string
  title: string;
  settings: GFMaterialSettings[];
  variety: GFMaterialVariety;
};

export type GFMaterialSettings = {
  // Format: `2017-04-06T00:00:00.000-07:00`
  active_date: string;
  //
  description: string;
  // The glowforge model.
  tube_type: GFMaterialTubeType;
  // Array of environments ths material is supported in.
  environment: GFMaterialEnvironment[];

  // Settings
  bitmap_engrave_settings: GFBitmapEngraveSetting[];
  cut_setting: GFCutSetting;
  score_settings: GFScoreSetting[];
  vector_engrave_settings: GFEngraveSetting[];
}

export type GFMaterialVariety = {
  //
  common_name: string;
  // usage unknown
  display_options: null;
  //
  name: string;
  // The thumbnail to display, no idea why its an array.
  thumbnails: string[];
  //
  type_name: string;
}

/**
 * Represents the result that settings will create when used on a material.
 */
export type GFOutcome = {
  name: string;
  dev_id: string;
}

export type GFCutSetting = {
  power: number;
  speed: number;
  passes: number;
  focal_offset: number | null;
}

export type GFScoreSetting = {
  power: number;
  speed: number;
  passes: number;
  focal_offset: number | null;
  uses: null;
  display_color_mask: null;
  outcome: GFOutcome;
}

export type GFEngraveSetting = {
  power: number;
  speed: number;
  passes: number;
  focal_offset: number | null;
  scangap: number;
  uses: null;
  display_color_mask: null;
  outcome: GFOutcome;
}

export type GFBitmapEngraveSetting = {
  power: number;
  speed: number;
  passes: number;
  focal_offset: number | null;
  scangap: number;
  render_method: 'FloydSteinbergDitherMethod' | 'RiemersmaDitherMethod' | null;
  rescale_method: 'LagrangeFilter';
  minimum_gray_percent: null;
  maximum_gray_percent: null;
  horizontal_timing: null;
  uses: null;
  display_color_mask: null;
  outcome: GFOutcome;
}
