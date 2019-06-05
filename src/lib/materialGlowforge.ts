export type GFMaterialEnvironment = 'production';
export type GFMaterialTubeType = 'basic' | 'pro';

export type GFMaterial = {
  // Format "Custom:0"
  id: string;
  nominal_thickness: null | number;
  sku: string;
  thickness_name: string;
  title: string;
  settings: GFMaterialSettings[];
  variety: GFMaterialVariety;
};

export type GFMaterialSettings = {
  active_date: string;
  bitmap_engrave_settings: GFBitmapEngraveSetting[];
  cut_setting: GFCutSetting;
  description: string;
  environment: GFMaterialEnvironment[];
  score_settings: GFScoreSetting[];
  tube_type: GFMaterialTubeType;
  vector_engrave_settings: GFEngraveSetting[];
}

export type GFMaterialVariety = {
  common_name: string;
  display_options: null;
  name: string;
  thumbnails: string[];
  type_name: string;
}

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
