const type = {
  'String': {
    id: 'String',
    title: 'String',
    sku: 'String',
    nominal_thickness: 'Number(3)',
    thickness_name: 'String',
    variety: {
      name: 'String',
      common_name: 'String',
      type_name: 'String',
      thumbnails: [
        'String'
      ],
      display_options: null
    },
    // Array of two objects with types: `pro`, or `basic`
    settings: [
      {
        description: 'String',
        active_date: 'String',
        // Use unknown, array of usable environments: `staging`, or `production`
        environment: [
          'staging|production',
        ],
        tube_type: 'pro|basic',
        cut_setting: {
          focal_offset: 'Integer|null',
          passes: 'Integer',
          power: 'Integer',
          speed: 'Integer',
        },
        // Array of as many score settings as you would like.
        score_settings: [
          {
            display_color_mask: null,
            focal_offset: 'Integer|null',
            outcome: {
              name: 'String',
              dev_id: 'String'
            },
            passes: 'Integer',
            power: 'Integer',
            speed: 'Integer',
            uses: [
              'default'
            ],
          }
        ],
        // Array of as many engrave settings as your would like.
        vector_engrave_settings: [
          {
            display_color_mask: null,
            focal_offset: 'Integer|null',
            outcome: {
              name: 'String',
              dev_id: 'String'
            },
            passes: 'Integer',
            power: 'Integer',
            scangap: 'Integer',
            speed: 'Integer',
            uses: null,
          }
        ],
        // Array of as many bitmap settings as you would like.
        bitmap_engrave_settings: [
          {
            display_color_mask: null,
            focal_offset: 'Integer|null',
            horizontal_timing: null,                // Always null
            // Used for 3d engrave on raster images only
            maximum_gray_percent: 'Integer|null',
            minimum_gray_percent: 'Integer|null',
            outcome: {
              name: 'String',
              dev_id: 'String'
            },
            passes: 'Integer',
            power: 'Integer',
            render_method: 'LagrangeFilter',
            rescale_method: 'FloydSteinbergDitherMethod|null',
            scangap: 'Integer',
            speed: 'Integer',
            uses: null,
          }
        ]
      }
    ],
    selected: false
  }
}
