const material = {
  'Glowforge:33': {
    id: 'Glowforge:33',
    title: 'Purple Acrylic, 1/8"',
    sku: 'purple-acrylic-medium-fake',
    nominal_thickness: 3.175,
    thickness_name: 'Medium',
    variety: {
      name: 'medium-purple-acrylic',
      common_name: 'Medium Purple Acrylic',
      type_name: 'Purple Acrylic',
      thumbnails: [
        '//images.ctfassets.net/ljtyf78xujn2/2IqfJCUTqMMs42ycic8I0/620271563052ca858906bf6b4bc2b4f0/Purple-Acrylic-Thumbnail.jpg'
      ],
      display_options: null
    },
    settings: [
      {
        description: 'Medium Purple Acrylic',
        active_date: '2017-04-06T00:00:00.000-07:00',
        environment: [
          'staging',
          'production'
        ],
        tube_type: 'basic',
        cut_setting: {
          power: 100,
          speed: 584,
          passes: 1,
          focal_offset: null
        },
        score_settings: [
          {
            power: 11,
            speed: 344,
            passes: null,
            focal_offset: null,
            uses: [
              'default'
            ],
            display_color_mask: null,
            outcome: {
              name: 'High Quality',
              dev_id: 'high-quality'
            }
          },
          {
            power: 41,
            speed: 2050,
            passes: null,
            focal_offset: null,
            uses: null,
            display_color_mask: null,
            outcome: {
              name: 'Draft',
              dev_id: 'draft'
            }
          }
        ],
        vector_engrave_settings: [
          {
            power: 100,
            speed: 8500,
            passes: 1,
            focal_offset: null,
            scangap: 7,
            uses: null,
            display_color_mask: null,
            outcome: {
              name: 'Draft Graphic',
              dev_id: 'draft-graphic-new'
            }
          },
          {
            power: 100,
            speed: 8500,
            passes: 1,
            focal_offset: null,
            scangap: 5,
            uses: [
              'default'
            ],
            display_color_mask: null,
            outcome: {
              name: 'SD Graphic',
              dev_id: 'sd-graphic-new'
            }
          },
          {
            power: 16,
            speed: 1967,
            passes: null,
            focal_offset: null,
            scangap: 3,
            uses: null,
            display_color_mask: null,
            outcome: {
              name: 'HD Graphic',
              dev_id: 'hd-graphic-new'
            }
          }
        ],
        bitmap_engrave_settings: [
          {
            horizontal_timing: null,
            power: 100,
            display_color_mask: null,
            speed: 8500,
            maximum_gray_percent: null,
            rescale_method: 'LagrangeFilter',
            render_method: null,
            uses: null,
            focal_offset: null,
            outcome: {
              name: 'Draft Graphic',
              dev_id: 'draft-graphic-new'
            },
            scangap: 7,
            minimum_gray_percent: null,
            passes: 1
          },
          {
            horizontal_timing: null,
            power: 100,
            display_color_mask: null,
            speed: 8500,
            maximum_gray_percent: null,
            rescale_method: 'LagrangeFilter',
            render_method: null,
            uses: null,
            focal_offset: null,
            outcome: {
              name: 'SD Graphic',
              dev_id: 'sd-graphic-new'
            },
            scangap: 5,
            minimum_gray_percent: null,
            passes: 1
          },
          {
            horizontal_timing: null,
            power: 16,
            display_color_mask: null,
            speed: 1967,
            maximum_gray_percent: null,
            rescale_method: 'LagrangeFilter',
            render_method: 'FloydSteinbergDitherMethod',
            uses: null,
            focal_offset: null,
            outcome: {
              name: 'HD Graphic',
              dev_id: 'hd-graphic-new'
            },
            scangap: 3,
            minimum_gray_percent: null,
            passes: null
          },
          {
            horizontal_timing: null,
            power: 100,
            display_color_mask: null,
            speed: 2900,
            maximum_gray_percent: null,
            rescale_method: 'LagrangeFilter',
            render_method: null,
            uses: null,
            focal_offset: null,
            outcome: {
              name: '3D Engrave',
              dev_id: '3d-engrave-shallow'
            },
            scangap: 4,
            minimum_gray_percent: null,
            passes: null
          }
        ]
      },
      {
        description: 'Medium Purple Acrylic, Pro',
        active_date: '2017-04-06T00:00:00.000-07:00',
        environment: [
          'staging',
          'production'
        ],
        tube_type: 'pro',
        cut_setting: {
          power: 100,
          speed: 711,
          passes: null,
          focal_offset: null
        },
        score_settings: [
          {
            power: 11,
            speed: 344,
            passes: null,
            focal_offset: null,
            uses: [
              'default'
            ],
            display_color_mask: null,
            outcome: {
              name: 'High Quality',
              dev_id: 'high-quality'
            }
          },
          {
            power: 41,
            speed: 2050,
            passes: null,
            focal_offset: null,
            uses: null,
            display_color_mask: null,
            outcome: {
              name: 'Draft',
              dev_id: 'draft'
            }
          }
        ],
        vector_engrave_settings: [
          {
            power: 100,
            speed: 8500,
            passes: 1,
            focal_offset: null,
            scangap: 7,
            uses: null,
            display_color_mask: null,
            outcome: {
              name: 'Draft Graphic',
              dev_id: 'draft-graphic-new'
            }
          },
          {
            power: 100,
            speed: 8500,
            passes: 1,
            focal_offset: null,
            scangap: 5,
            uses: [
              'default'
            ],
            display_color_mask: null,
            outcome: {
              name: 'SD Graphic',
              dev_id: 'sd-graphic-new'
            }
          },
          {
            power: 16,
            speed: 1967,
            passes: null,
            focal_offset: null,
            scangap: 3,
            uses: null,
            display_color_mask: null,
            outcome: {
              name: 'HD Graphic',
              dev_id: 'hd-graphic-new'
            }
          }
        ],
        bitmap_engrave_settings: [
          {
            horizontal_timing: null,
            power: 100,
            display_color_mask: null,
            speed: 8500,
            maximum_gray_percent: null,
            rescale_method: 'LagrangeFilter',
            render_method: null,
            uses: null,
            focal_offset: null,
            outcome: {
              name: 'Draft Graphic',
              dev_id: 'draft-graphic-new'
            },
            scangap: 7,
            minimum_gray_percent: null,
            passes: 1
          },
          {
            horizontal_timing: null,
            power: 100,
            display_color_mask: null,
            speed: 8500,
            maximum_gray_percent: null,
            rescale_method: 'LagrangeFilter',
            render_method: null,
            uses: null,
            focal_offset: null,
            outcome: {
              name: 'SD Graphic',
              dev_id: 'sd-graphic-new'
            },
            scangap: 5,
            minimum_gray_percent: null,
            passes: 1
          },
          {
            horizontal_timing: null,
            power: 16,
            display_color_mask: null,
            speed: 1967,
            maximum_gray_percent: null,
            rescale_method: 'LagrangeFilter',
            render_method: 'FloydSteinbergDitherMethod',
            uses: null,
            focal_offset: null,
            outcome: {
              name: 'HD Graphic',
              dev_id: 'hd-graphic-new'
            },
            scangap: 3,
            minimum_gray_percent: null,
            passes: null
          },
          {
            horizontal_timing: null,
            power: 100,
            display_color_mask: null,
            speed: 3840,
            maximum_gray_percent: null,
            rescale_method: 'LagrangeFilter',
            render_method: null,
            uses: null,
            focal_offset: null,
            outcome: {
              name: '3D Engrave',
              dev_id: '3d-engrave-shallow'
            },
            scangap: 4,
            minimum_gray_percent: null,
            passes: null
          }
        ]
      }
    ],
    selected: false
  }
}
console.log(JSON.stringify(material));
