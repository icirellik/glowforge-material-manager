const materials = {
  materialList: {
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
      ]
    },
    'Glowforge:44': {
      id: 'Glowforge:44',
      title: 'Fluorescent Pink Acrylic, 1/8"',
      sku: 'fluor-pink-acrylic-medium-fake',
      nominal_thickness: 3.175,
      thickness_name: 'Medium',
      variety: {
        name: 'medium-fluorescent-pink-acrylic',
        common_name: 'Medium Fluorescent Pink Acrylic',
        type_name: 'Fluorescent Pink Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/3lHYFPlkKcmAq84yU2OsEK/fae08d9b07e61ef3de0648f0321f0a23/Fluoro-Pink-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Fluorescent Pink Acrylic, 1/8"',
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
            },
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
          description: 'Medium Fluorescent Pink  Acrylic, 1/8", Pro',
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
            },
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
      ]
    },
    'Glowforge:55': {
      id: 'Glowforge:55',
      title: 'Red Acrylic, 1/4"',
      sku: 'fake-red-acrylic',
      nominal_thickness: 6,
      thickness_name: 'Thick',
      variety: {
        name: 'thick-red-acrylic',
        common_name: 'Thick Red Acrylic',
        type_name: 'Red Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/1mPTgrmzVmuEYYSkqmy8cE/92274af2406c9cc9bf1388d2c2fe2219/Red-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Thick Global Acrylic Settings, Basic',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 246,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
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
            },
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        },
        {
          description: 'Thick Global Acrylic Settings, Pro',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 343,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        }
      ]
    },
    'Glowforge:88': {
      id: 'Glowforge:88',
      title: 'Clearly White Google Pixel 2®',
      sku: 'FAKE_WhitePixel2',
      nominal_thickness: 7.6,
      thickness_name: 'Clearly White',
      variety: {
        name: 'white-google-pixel2',
        common_name: 'Clearly White Google Pixel 2®',
        type_name: 'Pixel 2®',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/54w5oUHsMoo6ccAMYcWsqi/82f29aaff900a7c745a2aebb7788ad70/Pixel_2_White'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'White Pixel 2 Settings',
          active_date: '2018-06-18T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          score_settings: [
            {
              power: 99,
              speed: 587,
              passes: null,
              focal_offset: null,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'High Quality',
                dev_id: 'high-quality'
              }
            }
          ],
          vector_engrave_settings: [
            {
              power: 99,
              speed: 8500,
              passes: null,
              focal_offset: null,
              scangap: 3,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              }
            }
          ],
          bitmap_engrave_settings: [
            {
              horizontal_timing: null,
              power: 99,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              },
              scangap: 3,
              minimum_gray_percent: null,
              passes: null
            }
          ]
        }
      ]
    },
    'Glowforge:34': {
      id: 'Glowforge:34',
      title: 'Draftboard, 1/8"',
      sku: 'medium-Draftboard-change-this',
      nominal_thickness: 3.17,
      thickness_name: 'Medium',
      variety: {
        name: 'medium-draftboard',
        common_name: 'Medium Draftboard',
        type_name: 'Draftboard',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/3O7IvKMB2wyI006Qag2SG0/a3dd2bd804fddefe4596fc35c902e4a5/Draftboard-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Draftboard Settings',
          active_date: '2017-04-07T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 762,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 6,
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
              power: 11,
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
              power: 11,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 11,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 50,
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
          description: 'Medium Draftboard Settings - Pro',
          active_date: '2017-04-07T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 914,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 6,
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
              power: 11,
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
              power: 11,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 11,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 50,
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
      ]
    },
    'Glowforge:56': {
      id: 'Glowforge:56',
      title: 'Orange Acrylic, 1/4"',
      sku: 'fake-orange-acrylic',
      nominal_thickness: 6,
      thickness_name: 'Thick',
      variety: {
        name: 'thick-orange-acrylic',
        common_name: 'Thick Orange Acrylic',
        type_name: 'Orange Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/1Pt42RAndi8iy8egmMYCAU/2e19182b3dab2467d002ca9ebfe44c7f/Orange-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Thick Global Acrylic Settings, Pro',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 343,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        },
        {
          description: 'Thick Global Acrylic Settings, Basic',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 246,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
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
            },
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        }
      ]
    },
    'Glowforge:89': {
      id: 'Glowforge:89',
      title: 'Magnesium Microsoft Surface 2®',
      sku: 'FAKE_MagnesiumSurface2',
      nominal_thickness: 8.9,
      thickness_name: 'Magnesium',
      variety: {
        name: 'magnesium-microsoft-surface-2',
        common_name: 'Magnesium Microsoft Surface 2®',
        type_name: 'Microsoft Surface 2®',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/5p3Gh7rc2sO06OaAaaysUk/1b184a67c288a5cd3705f51d00187610/Surface_2_Magnesium.png'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Magnesium Microsoft Surface 2 Settings',
          active_date: '2018-06-19T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          score_settings: [
            {
              power: 99,
              speed: 344,
              passes: null,
              focal_offset: null,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'High Quality',
                dev_id: 'high-quality'
              }
            }
          ],
          vector_engrave_settings: [
            {
              power: 99,
              speed: 8500,
              passes: null,
              focal_offset: null,
              scangap: 3,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              }
            }
          ],
          bitmap_engrave_settings: [
            {
              horizontal_timing: null,
              power: 99,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              },
              scangap: 3,
              minimum_gray_percent: null,
              passes: null
            }
          ]
        }
      ]
    },
    'Glowforge:12': {
      id: 'Glowforge:12',
      title: 'Maple Plywood, 1/8"',
      sku: 'fake-sku-need-to-figure-out-publishing',
      nominal_thickness: 3.29,
      thickness_name: 'Medium',
      variety: {
        name: 'maple_plywood_eighth_inch',
        common_name: 'Medium Maple Plywood',
        type_name: 'Maple Plywood',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/6EHF2Qahb2Qg4g6cagaOag/6bebace4670f12b4277957c00a1ee740/Maple-Thumbnail.jpg'
        ],
        display_options: {
          thumbnail_contrast: [
            'light'
          ],
          thumbnail_text_color: null
        }
      },
      settings: [
        {
          description: 'Medium Maple Plywood Settings, Basic',
          active_date: '2017-03-23T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 636,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
            {
              power: 21,
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
              speed: 8500,
              maximum_gray_percent: 85,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-updated'
              },
              scangap: 8,
              minimum_gray_percent: 0,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: 90,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-updated'
              },
              scangap: 3,
              minimum_gray_percent: 40,
              passes: 1
            }
          ]
        },
        {
          description: 'Medium Maple Plywood Settings, Pro',
          active_date: '2017-03-23T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 763,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 21,
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
              speed: 8500,
              maximum_gray_percent: 85,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-updated'
              },
              scangap: 8,
              minimum_gray_percent: 0,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: 90,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-updated'
              },
              scangap: 3,
              minimum_gray_percent: 40,
              passes: 1
            }
          ]
        }
      ]
    },
    'Glowforge:35': {
      id: 'Glowforge:35',
      title: 'Thin Natural Leather, 1.5 oz.',
      sku: 'thin-natural-leather-change-this',
      nominal_thickness: 1,
      thickness_name: 'Thin',
      variety: {
        name: 'thin-natural-leather',
        common_name: 'Thin Natural Leather',
        type_name: 'Natural Leather',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/24HmG5n9wIeeu8kK2qG4QY/ce8afbe495e628d9ae86999ec155919a/Natural-Leather-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Thin Natural Leather Settings',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 70,
            speed: 1524,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 2,
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
              power: 16,
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
              power: 51,
              speed: 8500,
              passes: null,
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
              power: 70,
              speed: 8500,
              passes: null,
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
              power: 6,
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
              power: 51,
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 70,
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 6,
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
              power: 80,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: null
            },
            {
              horizontal_timing: null,
              power: 11,
              display_color_mask: null,
              speed: 1967,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 40,
              passes: null
            }
          ]
        }
      ]
    },
    'Glowforge:57': {
      id: 'Glowforge:57',
      title: 'Yellow Acrylic, 1/4"',
      sku: 'fake-yellow-acrylic',
      nominal_thickness: 6,
      thickness_name: 'Thick',
      variety: {
        name: 'thick-yellow-acrylic',
        common_name: 'Thick Yellow Acrylic',
        type_name: 'Yellow Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/2i3xli5oY00yy8MumOaics/da7edc7756fb719404d7759788e36f7f/Yellow-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Thick Global Acrylic Settings, Pro',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 343,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        },
        {
          description: 'Thick Global Acrylic Settings, Basic',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 246,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
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
            },
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        }
      ]
    },
    'Glowforge:13': {
      id: 'Glowforge:13',
      title: 'Maple Plywood, 1/4"',
      sku: 'thick-maple-plywood-update',
      nominal_thickness: 5.3,
      thickness_name: 'Thick',
      variety: {
        name: 'thick-maple-plywood',
        common_name: 'Thick Maple Plywood',
        type_name: 'Maple Plywood',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/6EHF2Qahb2Qg4g6cagaOag/6bebace4670f12b4277957c00a1ee740/Maple-Thumbnail.jpg'
        ],
        display_options: {
          thumbnail_contrast: [
            'light'
          ],
          thumbnail_text_color: null
        }
      },
      settings: [
        {
          description: 'Thick Maple Plywood Settings, Basic',
          active_date: '2017-04-05T00:00:00.000-07:00',
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            }
          ]
        },
        {
          description: 'Thick Maple Plywood Settings, Pro',
          active_date: '2017-03-23T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 701,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            }
          ]
        }
      ]
    },
    'Glowforge:24': {
      id: 'Glowforge:24',
      title: 'Basswood Hardwood, 1/8"',
      sku: 'bedium-basswood-hardwood-fake',
      nominal_thickness: 3.35,
      thickness_name: 'Medium',
      variety: {
        name: 'basswood-hardwood',
        common_name: 'Basswood Hardwood',
        type_name: 'Basswood Hardwood',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/4ZIRKeg2ogc6Q8uEA2yOYY/ee1a9e5add278665c261ff5b1bc2c1f9/Basswood-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Basswood Hardwood, BASIC',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 1074,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 6,
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
              power: 6,
              speed: 1967,
              passes: 1,
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
              power: 6,
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
              speed: 8500,
              maximum_gray_percent: 85,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-updated'
              },
              scangap: 8,
              minimum_gray_percent: 0,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: 85,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-updated'
              },
              scangap: 3,
              minimum_gray_percent: 50,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 3366,
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
          description: 'Medium Basswood Hardwood, Pro',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 1270,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 6,
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
              power: 6,
              speed: 1967,
              passes: 1,
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
              power: 6,
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
              speed: 8500,
              maximum_gray_percent: 85,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-updated'
              },
              scangap: 8,
              minimum_gray_percent: 0,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: 85,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-updated'
              },
              scangap: 3,
              minimum_gray_percent: 50,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 4039,
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
      ]
    },
    'Glowforge:36': {
      id: 'Glowforge:36',
      title: 'Red Acrylic, 1/8"',
      sku: 'red-acrylic-medium-fake',
      nominal_thickness: 3.175,
      thickness_name: 'Medium',
      variety: {
        name: 'medium-red-acrylic',
        common_name: 'Medium Red Acrylic',
        type_name: 'Red Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/1mPTgrmzVmuEYYSkqmy8cE/92274af2406c9cc9bf1388d2c2fe2219/Red-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Red Acrylic',
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
          description: 'Medium Red Acrylic, Pro',
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
      ]
    },
    'Glowforge:47': {
      id: 'Glowforge:47',
      title: 'Draftboard, 1/4"',
      sku: 'fill-in-later',
      nominal_thickness: 5.3,
      thickness_name: 'Thick',
      variety: {
        name: 'thick-draftboard',
        common_name: 'Thick Draftboard',
        type_name: 'Draftboard',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/3O7IvKMB2wyI006Qag2SG0/a3dd2bd804fddefe4596fc35c902e4a5/Draftboard-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Thick Draftboard Settings, Basic',
          active_date: '2017-06-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 345,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
            {
              power: 21,
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
              power: 60,
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
              power: 11,
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
              power: 11,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 11,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 50,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        },
        {
          description: 'Thick Draftboard Settings, Pro',
          active_date: '2017-06-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 414,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 21,
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
              power: 60,
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
              power: 11,
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
              power: 11,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 11,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 50,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        }
      ]
    },
    'Glowforge:58': {
      id: 'Glowforge:58',
      title: 'Purple Acrylic, 1/4',
      sku: 'fake-purple-acrylic',
      nominal_thickness: 6,
      thickness_name: 'Thick',
      variety: {
        name: 'thick-purple-acrylic',
        common_name: 'Thick Purple Acrylic',
        type_name: 'Purple Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/2IqfJCUTqMMs42ycic8I0/620271563052ca858906bf6b4bc2b4f0/Purple-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Thick Global Acrylic Settings, Pro',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 343,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        },
        {
          description: 'Thick Global Acrylic Settings, Basic',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 246,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
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
            },
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        }
      ]
    },
    'Glowforge:14': {
      id: 'Glowforge:14',
      title: 'Medium Natural Leather, 2-3 oz.',
      sku: 'natural-leather-change-this-value',
      nominal_thickness: 1.75,
      thickness_name: 'Medium',
      variety: {
        name: 'medium-natural-leather',
        common_name: 'Medium Natural Leather',
        type_name: 'Natural Leather',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/24HmG5n9wIeeu8kK2qG4QY/ce8afbe495e628d9ae86999ec155919a/Natural-Leather-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Natural Leather Settings',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 80,
            speed: 1524,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
            {
              power: 2,
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
              power: 16,
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
              power: 51,
              speed: 8500,
              passes: null,
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
              power: 70,
              speed: 8500,
              passes: null,
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
              power: 6,
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
              power: 51,
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 70,
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 6,
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
              power: 80,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: null
            },
            {
              horizontal_timing: null,
              power: 11,
              display_color_mask: null,
              speed: 1967,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 40,
              passes: null
            }
          ]
        }
      ]
    },
    'Glowforge:25': {
      id: 'Glowforge:25',
      title: 'Red Oak Hardwood, 1/8"',
      sku: 'medium-red-oak-hardwood-fake',
      nominal_thickness: 3.35,
      thickness_name: 'Medium',
      variety: {
        name: 'red-oak-hardwood',
        common_name: 'Red Oak Hardwood',
        type_name: 'Red Oak Hardwood',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/1kAdRcRNrKCESgGOekuoOY/641a297bccf81cacd2336db963eec2b4/Red-Oak-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Red Oak Hardwood, BASIC',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 889,
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
              power: 60,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 3366,
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
          description: 'Medium Red Oak Hardwood, PRO',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 1067,
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
              power: 60,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 4039,
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
      ]
    },
    'Glowforge:37': {
      id: 'Glowforge:37',
      title: 'Green Acrylic, 1/8"',
      sku: 'green-acrylic-medium-fake',
      nominal_thickness: 3.175,
      thickness_name: 'Medium',
      variety: {
        name: 'medium-green-acrylic',
        common_name: 'Medium Green Acrylic',
        type_name: 'Green Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/4V2gfrKRPOWuMQS4CcCmeK/ccbcbeb1e3286732ca6dbd18d2477559/Green-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Green Acrylic',
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
          description: 'Medium Green Acrylic, Pro',
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
            },
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
      ]
    },
    'Glowforge:48': {
      id: 'Glowforge:48',
      title: 'Basswood Plywood, 1/8"',
      sku: 'med-bass-ply-replace',
      nominal_thickness: 3.29,
      thickness_name: 'Medium',
      variety: {
        name: 'medium-basswood-plywood',
        common_name: 'Medium Basswood Plywood',
        type_name: 'Basswood Plywood',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/2iFB3oY3k068uEwgOY40WM/32714a52dd39e48ba10bc76c64c1ce33/Basswood-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Basswood Plywood Settings, Basic',
          active_date: '2018-05-01T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 587,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 30,
              speed: 2050,
              passes: null,
              focal_offset: null,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'Draft',
                dev_id: 'draft'
              }
            },
            {
              power: 10,
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
            }
          ],
          vector_engrave_settings: [
            {
              power: 100,
              speed: 8500,
              passes: null,
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
              passes: null,
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
              power: 50,
              speed: 2900,
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
              passes: null
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 15,
              display_color_mask: null,
              speed: 2900,
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
              speed: 8500,
              maximum_gray_percent: 85,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-updated'
              },
              scangap: 8,
              minimum_gray_percent: 0,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: 85,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-updated'
              },
              scangap: 3,
              minimum_gray_percent: 50,
              passes: 1
            }
          ]
        },
        {
          description: 'Medium Basswood Plywood Settings, Pro',
          active_date: '2018-05-01T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 783,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 30,
              speed: 2050,
              passes: null,
              focal_offset: null,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'Draft',
                dev_id: 'draft'
              }
            },
            {
              power: 10,
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
            }
          ],
          vector_engrave_settings: [
            {
              power: 100,
              speed: 8500,
              passes: null,
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
              passes: null,
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
              power: 50,
              speed: 2900,
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
              passes: null
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 15,
              display_color_mask: null,
              speed: 2900,
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
              speed: 8500,
              maximum_gray_percent: 85,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-updated'
              },
              scangap: 8,
              minimum_gray_percent: 0,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: 85,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-updated'
              },
              scangap: 3,
              minimum_gray_percent: 50,
              passes: 1
            }
          ]
        }
      ]
    },
    'Glowforge:59': {
      id: 'Glowforge:59',
      title: 'Teal Acrylic, 1/4"',
      sku: 'fake-teal-acrylic',
      nominal_thickness: 6,
      thickness_name: 'Thick',
      variety: {
        name: 'thick-teal-acrylic',
        common_name: 'Thick Teal Acrylic',
        type_name: 'Teal Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/55G2eOmRfaqA64oQeG2IsK/37be392b8bd7df35d09d0b44df9d3598/Teal-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Thick Global Acrylic Settings, Basic',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 246,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
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
            },
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        },
        {
          description: 'Thick Global Acrylic Settings, Pro',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 343,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        }
      ]
    },
    'Glowforge:15': {
      id: 'Glowforge:15',
      title: 'Thick Natural Leather, 5-6 oz.',
      sku: 'thick-natural-leather-change-this',
      nominal_thickness: 2.75,
      thickness_name: 'Thick',
      variety: {
        name: 'thick-natural-leather',
        common_name: 'Thick Natural Leather',
        type_name: 'Natural Leather',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/3CWm0wy72U4KuSIKEaGmuw/f67b594a3fadb3ab1aa58b3a212b678c/Leather-1.png'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Thick Natural Leather Settings',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 99,
            speed: 762,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 2,
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
              power: 16,
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
              power: 51,
              speed: 8500,
              passes: null,
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
              power: 70,
              speed: 8500,
              passes: null,
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
              power: 6,
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
              power: 51,
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 70,
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 6,
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
              power: 80,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: null
            },
            {
              horizontal_timing: null,
              power: 11,
              display_color_mask: null,
              speed: 1967,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 40,
              passes: null
            }
          ]
        }
      ]
    },
    'Glowforge:26': {
      id: 'Glowforge:26',
      title: 'Cherry Plywood, 1/8"',
      sku: 'medium-cherry-plywood-change-this',
      nominal_thickness: 3.17,
      thickness_name: 'Medium',
      variety: {
        name: 'medium-cherry-plywood',
        common_name: 'Medium Cherry Plywood',
        type_name: 'Cherry Plywood',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/1Mf8Nha5dWECQMe2GKuGAq/26aee05d166e8cafb4c043c6342098d6/Cherry-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Cherry Plywood Settings, Basic',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 711,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 21,
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
              power: 21,
              speed: 2433,
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
              power: 21,
              display_color_mask: null,
              speed: 2433,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            }
          ]
        },
        {
          description: 'Medium Cherry Plywood Settings, Pro',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 763,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 21,
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
              power: 21,
              speed: 2433,
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
              power: 21,
              display_color_mask: null,
              speed: 2433,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            }
          ]
        }
      ]
    },
    'Glowforge:38': {
      id: 'Glowforge:38',
      title: 'Orange Acrylic, 1/8"',
      sku: 'orange-acrylic-medium-fake',
      nominal_thickness: 3.175,
      thickness_name: 'Medium',
      variety: {
        name: 'medium-orange-acrylic',
        common_name: 'Medium Orange Acrylic',
        type_name: 'Orange Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/1Pt42RAndi8iy8egmMYCAU/2e19182b3dab2467d002ca9ebfe44c7f/Orange-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Orange Acrylic',
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
          description: 'Medium Orange Acrylic, Pro',
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
      ]
    },
    'Glowforge:49': {
      id: 'Glowforge:49',
      title: 'Basswood Plywood, 1/4"',
      sku: 'thick-basswood-ply-replace',
      nominal_thickness: 5.3,
      thickness_name: 'Thick',
      variety: {
        name: 'thick-basswood-plywood',
        common_name: 'Thick Basswood Plywood',
        type_name: 'Basswood Plywood',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/2iFB3oY3k068uEwgOY40WM/32714a52dd39e48ba10bc76c64c1ce33/Basswood-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Thick Basswood Plywood Settings, Basic',
          active_date: '2018-05-01T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 743,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 30,
              speed: 2050,
              passes: null,
              focal_offset: null,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'Draft',
                dev_id: 'draft'
              }
            },
            {
              power: 10,
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
            }
          ],
          vector_engrave_settings: [
            {
              power: 100,
              speed: 8500,
              passes: null,
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
              passes: null,
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
              power: 50,
              speed: 2900,
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
              passes: null
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 15,
              display_color_mask: null,
              speed: 2900,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 7,
              minimum_gray_percent: null,
              passes: null
            },
            {
              horizontal_timing: null,
              power: 80,
              display_color_mask: null,
              speed: 1967,
              maximum_gray_percent: 85,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 0,
              passes: null
            }
          ]
        },
        {
          description: 'Thick Basswood Plywood Settings, Pro',
          active_date: '2018-05-01T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 899,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 30,
              speed: 2050,
              passes: null,
              focal_offset: null,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'Draft',
                dev_id: 'draft'
              }
            },
            {
              power: 10,
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
            }
          ],
          vector_engrave_settings: [
            {
              power: 100,
              speed: 8500,
              passes: null,
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
              passes: null,
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
              power: 50,
              speed: 2900,
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
              passes: null
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 15,
              display_color_mask: null,
              speed: 2900,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 7,
              minimum_gray_percent: null,
              passes: null
            },
            {
              horizontal_timing: null,
              power: 80,
              display_color_mask: null,
              speed: 1967,
              maximum_gray_percent: 85,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 0,
              passes: null
            }
          ]
        }
      ]
    },
    'Glowforge:16': {
      id: 'Glowforge:16',
      title: 'Maple Veneer, 1/32"',
      sku: 'maple-veneer-fake',
      nominal_thickness: 1,
      thickness_name: 'Thin',
      variety: {
        name: 'maple-veneer',
        common_name: 'Maple Veneer',
        type_name: 'Maple Veneer',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/6EHF2Qahb2Qg4g6cagaOag/6bebace4670f12b4277957c00a1ee740/Maple-Thumbnail.jpg'
        ],
        display_options: {
          thumbnail_contrast: [
            'light'
          ],
          thumbnail_text_color: null
        }
      },
      settings: [
        {
          description: 'Maple Veneer Settings, Basic',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 1626,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
            {
              power: 2,
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
              power: 80,
              speed: 8500,
              passes: null,
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
              power: 70,
              speed: 8500,
              passes: null,
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
              power: 11,
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
              power: 80,
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 70,
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 11,
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
              power: 80,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: null
            },
            {
              horizontal_timing: null,
              power: 11,
              display_color_mask: null,
              speed: 4767,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 40,
              passes: null
            }
          ]
        },
        {
          description: 'Maple Veneer Settings, Pro',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 1956,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 2,
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
              power: 80,
              speed: 8500,
              passes: null,
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
              power: 70,
              speed: 8500,
              passes: null,
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
              power: 11,
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
              power: 80,
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 70,
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 11,
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
              power: 80,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: null
            },
            {
              horizontal_timing: null,
              power: 11,
              display_color_mask: null,
              speed: 4767,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 40,
              passes: null
            }
          ]
        }
      ]
    },
    'Glowforge:27': {
      id: 'Glowforge:27',
      title: 'Walnut Plywood, 1/8"',
      sku: 'this-is-fake-walnut-plywood-sku',
      nominal_thickness: 3.3,
      thickness_name: 'Medium',
      variety: {
        name: 'walnut-plywood-one-eighth-inch',
        common_name: ' Medium Walnut Plywood',
        type_name: 'Walnut Plywood',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/6xFe5SNotiqawi20YKOYqY/db6f10a1d7c9c7167cd87ef412d8bcee/Walnut-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Walnut Plywood Settings, Basic',
          active_date: '2017-03-26T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 711,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
            {
              power: 21,
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
              power: 31,
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
              power: 21,
              speed: 2433,
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
              power: 21,
              display_color_mask: null,
              speed: 2433,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            }
          ]
        },
        {
          description: 'Medium Walnut Plywood Settings, Pro',
          active_date: '2017-03-26T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 763,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 21,
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
              power: 31,
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
              power: 21,
              speed: 2433,
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
              power: 21,
              display_color_mask: null,
              speed: 2433,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            }
          ]
        }
      ]
    },
    'Glowforge:17': {
      id: 'Glowforge:17',
      title: 'Walnut Veneer, 1/32"',
      sku: 'walnut-veneer-fake',
      nominal_thickness: 1,
      thickness_name: 'Thin',
      variety: {
        name: 'walnut-veneer',
        common_name: 'Walnut Veneer',
        type_name: 'Walnut Veneer',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/6xFe5SNotiqawi20YKOYqY/db6f10a1d7c9c7167cd87ef412d8bcee/Walnut-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Walnut Veneer Settings',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 1626,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
            {
              power: 2,
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
              power: 21,
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
              power: 70,
              speed: 8500,
              passes: null,
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
              power: 70,
              speed: 8500,
              passes: null,
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
              speed: 2433,
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
              power: 70,
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 70,
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 16,
              display_color_mask: null,
              speed: 2433,
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
              power: 80,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: null
            }
          ]
        },
        {
          description: 'Walnut Veneer Settings, Pro',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 1956,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 2,
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
              power: 21,
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
              power: 70,
              speed: 8500,
              passes: null,
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
              power: 70,
              speed: 8500,
              passes: null,
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
              speed: 2433,
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
              power: 70,
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 70,
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 16,
              display_color_mask: null,
              speed: 2433,
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
              power: 80,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: null
            }
          ]
        }
      ]
    },
    'Glowforge:28': {
      id: 'Glowforge:28',
      title: 'Poplar Hardwood, 1/8"',
      sku: 'poplar-change-this',
      nominal_thickness: 3.35,
      thickness_name: 'Medium',
      variety: {
        name: 'poplar-hardwood',
        common_name: 'Poplar Hardwood',
        type_name: 'Poplar Hardwood',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/36eP2Ks7gsE28ioOg2KkU6/b4eabf88edfb943673eb15fe4fe1b21a/Poplar-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Poplar Hardwood Settings, BASIC',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 977,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 4,
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
              power: 6,
              speed: 1500,
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
              power: 6,
              display_color_mask: null,
              speed: 1500,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 11,
              display_color_mask: null,
              speed: 1966,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 40,
              passes: null
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 5700,
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
          description: 'Medium Poplar Hardwood Settings, PRO',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 1172,
            passes: null,
            focal_offset: null
          },
          score_settings: [
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
            },
            {
              power: 4,
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
              power: 6,
              speed: 1500,
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
              power: 6,
              display_color_mask: null,
              speed: 1500,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 11,
              display_color_mask: null,
              speed: 1966,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 40,
              passes: null
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 6840,
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
      ]
    },
    'Custom:0': {
      id: 'Custom:0',
      nominal_thickness: 3.2,
      settings: [
        {
          active_date: '2017-04-06T00:00-07:00',
          bitmap_engrave_settings: [],
          cut_setting: {
            focal_offset: null,
            passes: 1,
            power: 99,
            speed: 100
          },
          description: 'Test One Settings',
          environment: [
            'production'
          ],
          score_settings: [],
          tube_type: 'basic',
          vector_engrave_settings: []
        },
        {
          active_date: '2017-04-06T00:00-07:00',
          bitmap_engrave_settings: [],
          cut_setting: {
            focal_offset: null,
            passes: 1,
            power: 99,
            speed: 100
          },
          description: 'Test One Settings',
          environment: [
            'production'
          ],
          score_settings: [],
          tube_type: 'pro',
          vector_engrave_settings: []
        }
      ],
      sku: '',
      thickness_name: 'Test',
      title: 'Test One',
      variety: {
        common_name: 'Test One',
        display_options: null,
        name: 'test-one',
        thumbnails: [
          'chrome-extension://ikjgmgfhgelagijhaagpdbcbkmpckpda/custom-material.png'
        ],
        type_name: 'One'
      }
    },
    'Glowforge:18': {
      id: 'Glowforge:18',
      title: 'Cherry Veneer, 1/32"',
      sku: 'cherry-veneer-fake',
      nominal_thickness: 1,
      thickness_name: 'Thin',
      variety: {
        name: 'cherry-veneer',
        common_name: 'Cherry Veneer',
        type_name: 'Cherry Veneer',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/1Mf8Nha5dWECQMe2GKuGAq/26aee05d166e8cafb4c043c6342098d6/Cherry-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Cherry Veneer Settings',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 1626,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
            {
              power: 2,
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
            }
          ],
          vector_engrave_settings: [
            {
              power: 51,
              speed: 8500,
              passes: null,
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
              power: 51,
              speed: 8500,
              passes: null,
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
              power: 6,
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
              power: 51,
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 51,
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 6,
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
              power: 80,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: null
            }
          ]
        },
        {
          description: 'Cherry Veneer Settings, Pro',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 1956,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 2,
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
            }
          ],
          vector_engrave_settings: [
            {
              power: 51,
              speed: 8500,
              passes: null,
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
              power: 51,
              speed: 8500,
              passes: null,
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
              power: 6,
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
              power: 51,
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 51,
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
              passes: null
            },
            {
              horizontal_timing: null,
              power: 6,
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
              power: 80,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: null
            }
          ]
        }
      ]
    },
    'Custom:1': {
      id: 'Custom:1',
      nominal_thickness: 3.2,
      settings: [
        {
          active_date: '2017-04-06T00:00-07:00',
          bitmap_engrave_settings: [],
          cut_setting: {
            focal_offset: null,
            passes: 1,
            power: 9.9,
            speed: 4000
          },
          description: 'Test Two Settings',
          environment: [
            'production'
          ],
          score_settings: [],
          tube_type: 'basic',
          vector_engrave_settings: []
        },
        {
          active_date: '2017-04-06T00:00-07:00',
          bitmap_engrave_settings: [],
          cut_setting: {
            focal_offset: null,
            passes: 1,
            power: 9.9,
            speed: 4000
          },
          description: 'Test Two Settings',
          environment: [
            'production'
          ],
          score_settings: [],
          tube_type: 'pro',
          vector_engrave_settings: []
        }
      ],
      sku: '',
      thickness_name: 'Test',
      title: 'Test Two',
      variety: {
        common_name: 'Test Two',
        display_options: null,
        name: 'test-two',
        thumbnails: [
          'chrome-extension://ikjgmgfhgelagijhaagpdbcbkmpckpda/custom-material.png'
        ],
        type_name: 'Two'
      }
    },
    'Glowforge:19': {
      id: 'Glowforge:19',
      title: 'Blue Acrylic, 1/8"',
      sku: 'blue-acrylic-medium-fake',
      nominal_thickness: 3.175,
      thickness_name: 'Medium',
      variety: {
        name: 'medium-blue-acrylic',
        common_name: 'Medium Blue Acrylic',
        type_name: 'Blue Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/386bhcUiVGYkcaUCqeo2sU/85cf9f1e6824532d548168d5d959a987/Blue-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Blue Acrylic',
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
              power: 41,
              speed: 2050,
              passes: null,
              focal_offset: null,
              uses: [
                'default'
              ],
              display_color_mask: null,
              outcome: {
                name: 'Draft',
                dev_id: 'draft'
              }
            },
            {
              power: 11,
              speed: 344,
              passes: null,
              focal_offset: null,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'High Quality',
                dev_id: 'high-quality'
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
          description: 'Medium Blue Acrylic, Pro',
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
              power: 41,
              speed: 2050,
              passes: null,
              focal_offset: null,
              uses: [
                'default'
              ],
              display_color_mask: null,
              outcome: {
                name: 'Draft',
                dev_id: 'draft'
              }
            },
            {
              power: 11,
              speed: 344,
              passes: null,
              focal_offset: null,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'High Quality',
                dev_id: 'high-quality'
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
      ]
    },
    'Custom:2': {
      id: 'Custom:2',
      nominal_thickness: null,
      settings: [
        {
          active_date: '2017-04-06T00:00-07:00',
          bitmap_engrave_settings: [],
          cut_setting: {
            focal_offset: null,
            passes: 1,
            power: 99,
            speed: 100
          },
          description: 'Test Bro Settings',
          environment: [
            'production'
          ],
          score_settings: [],
          tube_type: 'basic',
          vector_engrave_settings: []
        },
        {
          active_date: '2017-04-06T00:00-07:00',
          bitmap_engrave_settings: [],
          cut_setting: {
            focal_offset: null,
            passes: 1,
            power: 99,
            speed: 100
          },
          description: 'Test Bro Settings',
          environment: [
            'production'
          ],
          score_settings: [],
          tube_type: 'pro',
          vector_engrave_settings: []
        }
      ],
      sku: '',
      thickness_name: 'Test',
      title: 'Test Bro',
      variety: {
        common_name: 'Test Bro',
        display_options: null,
        name: 'test-bro',
        thumbnails: [
          'chrome-extension://ikjgmgfhgelagijhaagpdbcbkmpckpda/custom-material.png'
        ],
        type_name: 'Bro'
      }
    },
    UNKNOWN: {
      id: 'UNKNOWN',
      title: 'Unknown Material',
      thickness_name: '',
      variety: {
        name: 'unknown',
        common_name: 'Unknown',
        type_name: 'Unknown',
        thumbnails: []
      },
      settings: []
    },
    'Glowforge:1': {
      id: 'Glowforge:1',
      title: 'Medium Clear Acrylic',
      sku: 'clear-acrylic-need-to-fill-in',
      nominal_thickness: 3.175,
      thickness_name: 'Medium',
      variety: {
        name: 'clear-acrylic-1-8-inch',
        common_name: 'Clear Acrylic, 1/8"',
        type_name: 'Clear Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/1BwLUuKJzaeeuaeqKGykaU/a8cd6a2ae83dde310725ad40b2061e64/Clear-Acrylic-Thumbnail.jpg'
        ],
        display_options: {
          thumbnail_contrast: [
            'light'
          ],
          thumbnail_text_color: null
        }
      },
      settings: [
        {
          description: 'Medium Clear Acrylic, Basic',
          active_date: '2017-04-04T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 660,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
          description: 'Medium Clear Acrylic, Pro',
          active_date: '2017-04-04T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 787,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
      ]
    },
    'Glowforge:2': {
      id: 'Glowforge:2',
      title: 'Thick Clear Acrylic',
      sku: 'clear-acrylic-thick-change-this',
      nominal_thickness: 6,
      thickness_name: 'Thick',
      variety: {
        name: 'thick-clear-acrylic',
        common_name: 'Thick Clear Acrylic',
        type_name: 'Clear Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/1BwLUuKJzaeeuaeqKGykaU/a8cd6a2ae83dde310725ad40b2061e64/Clear-Acrylic-Thumbnail.jpg'
        ],
        display_options: {
          thumbnail_contrast: [
            'light'
          ],
          thumbnail_text_color: null
        }
      },
      settings: [
        {
          description: 'Thick Clear Acrylic Settings, Basic',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 246,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
              passes: null
            },
            {
              horizontal_timing: null,
              power: 41,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'Photo (Expiring Soon)',
                dev_id: 'Photo'
              },
              scangap: 3,
              minimum_gray_percent: null,
              passes: 1
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        },
        {
          description: 'Thick Clear Acrylic Settings, Pro',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 343,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        }
      ]
    },
    'Glowforge:3': {
      id: 'Glowforge:3',
      title: 'Cherry Plywood, 1/4"',
      sku: 'thick-cherry-plywood-change-this',
      nominal_thickness: 5.3,
      thickness_name: 'Thick',
      variety: {
        name: 'thick-cherry-plywood',
        common_name: 'Thick Cherry Plywood',
        type_name: 'Cherry Plywood',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/1Mf8Nha5dWECQMe2GKuGAq/26aee05d166e8cafb4c043c6342098d6/Cherry-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Thick Cherry Plywood Settings',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 584,
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
              power: 11,
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
              power: 11,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 16,
              display_color_mask: null,
              speed: 4000,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 30,
              passes: null
            }
          ]
        },
        {
          description: 'Thick Cherry Plywood Settings, Pro',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 701,
            passes: null,
            focal_offset: null
          },
          score_settings: [
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
            },
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
              power: 11,
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
              power: 11,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 16,
              display_color_mask: null,
              speed: 4000,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 30,
              passes: null
            }
          ]
        }
      ]
    },
    'Glowforge:4': {
      id: 'Glowforge:4',
      title: 'Walnut Plywood, 1/4"',
      sku: 'thick-walnut-plywood-change-this',
      nominal_thickness: 5.3,
      thickness_name: 'Thick',
      variety: {
        name: 'thick-walnut-plywood',
        common_name: 'Thick Walnut Plywood',
        type_name: 'Walnut Plywood',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/6xFe5SNotiqawi20YKOYqY/db6f10a1d7c9c7167cd87ef412d8bcee/Walnut-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Thick Walnut Plywood Settings, Basic',
          active_date: '2017-07-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 584,
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
              power: 6,
              speed: 1500,
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
              power: 6,
              display_color_mask: null,
              speed: 1500,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            }
          ]
        },
        {
          description: 'Thick Walnut Plywood Settings, Pro',
          active_date: '2017-06-19T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 600,
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
              power: 6,
              speed: 1500,
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
              power: 6,
              display_color_mask: null,
              speed: 1500,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            }
          ]
        }
      ]
    },
    'Glowforge:5': {
      id: 'Glowforge:5',
      title: 'Frosted Acrylic, 1/8"',
      sku: 'medium-frosted-acrylic-fake',
      nominal_thickness: 3.175,
      thickness_name: 'Medium ',
      variety: {
        name: 'medium-frosted-acrylic',
        common_name: 'Medium Frosted Acrylic',
        type_name: 'Frosted Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/3Gq6E6ihBeEgm2owcIkYuW/798b3dbe86483386d3228fdd3ade20d6/Frosted-Clear-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Frosted Acrylic, Basic',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 732,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 11,
              speed: 344,
              passes: null,
              focal_offset: null,
              uses: null,
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
              uses: [
                'default'
              ],
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
          description: 'Medium Frosted Acrylic, Pro',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 914,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 11,
              speed: 344,
              passes: null,
              focal_offset: null,
              uses: null,
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
              uses: [
                'default'
              ],
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
      ]
    },
    'Glowforge:6': {
      id: 'Glowforge:6',
      title: 'Teal Acrylic, 1/8"',
      sku: 'teal-acrylic-medium-fake',
      nominal_thickness: 3.175,
      thickness_name: 'Medium',
      variety: {
        name: 'medium-teal-acrylic',
        common_name: 'Medium Teal Acrylic',
        type_name: 'Teal Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/55G2eOmRfaqA64oQeG2IsK/37be392b8bd7df35d09d0b44df9d3598/Teal-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Teal Acrylic',
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
              power: 41,
              speed: 2050,
              passes: null,
              focal_offset: null,
              uses: [
                'default'
              ],
              display_color_mask: null,
              outcome: {
                name: 'Draft',
                dev_id: 'draft'
              }
            },
            {
              power: 11,
              speed: 344,
              passes: null,
              focal_offset: null,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'High Quality',
                dev_id: 'high-quality'
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
          description: 'Medium Teal Acrylic, Pro',
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
              uses: null,
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
              uses: [
                'default'
              ],
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
      ]
    },
    'Glowforge:90': {
      id: 'Glowforge:90',
      title: 'Dark Titanium Microsoft Surface RT®',
      sku: 'FAKE_DarkTitaniumSurfaceRT',
      nominal_thickness: 8.9,
      thickness_name: 'Black',
      variety: {
        name: 'dark-titanium-microsoft-surface-rt',
        common_name: 'Dark Titanium Microsoft Surface RT®',
        type_name: 'Microsoft Surface RT®',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/6bgdYdjwU8wK8Ms2AE2aWy/c907fdbdef982e90362317a4f1e6826a/Surface_RT_Dark_Titanium'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Dark Titanium Microsoft Surface RT Settings',
          active_date: '2018-06-19T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          score_settings: [
            {
              power: 99,
              speed: 587,
              passes: null,
              focal_offset: null,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'High Quality',
                dev_id: 'high-quality'
              }
            }
          ],
          vector_engrave_settings: [
            {
              power: 99,
              speed: 8500,
              passes: null,
              focal_offset: null,
              scangap: 3,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              }
            }
          ],
          bitmap_engrave_settings: [
            {
              horizontal_timing: null,
              power: 99,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              },
              scangap: 3,
              minimum_gray_percent: null,
              passes: null
            }
          ]
        }
      ]
    },
    'Glowforge:8': {
      id: 'Glowforge:8',
      title: 'Cherry Hardwood, 1/8"',
      sku: 'cherry-hardwood-change-this',
      nominal_thickness: 3.175,
      thickness_name: 'Medium',
      variety: {
        name: 'cherry-hardwood',
        common_name: 'Cherry Hardwood',
        type_name: 'Cherry Hardwood',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/1Mf8Nha5dWECQMe2GKuGAq/26aee05d166e8cafb4c043c6342098d6/Cherry-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Cherry Hardwood Settings, BASIC',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 965,
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
              power: 51,
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
              power: 21,
              speed: 2433,
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
              power: 21,
              display_color_mask: null,
              speed: 2433,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 11,
              display_color_mask: null,
              speed: 2433,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 40,
              passes: null
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 4767,
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
          description: 'Medium Cherry Hardwood Settings, PRO',
          active_date: '2017-03-01T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 1168,
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
              power: 51,
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
              power: 21,
              speed: 2433,
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
              power: 21,
              display_color_mask: null,
              speed: 2433,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 11,
              display_color_mask: null,
              speed: 2433,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 40,
              passes: null
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 5720,
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
      ]
    },
    'Glowforge:81': {
      id: 'Glowforge:81',
      title: 'Silver iPhone 7®',
      sku: 'Fake_SilveriPhone7',
      nominal_thickness: 7.3,
      thickness_name: 'Silver',
      variety: {
        name: 'silver-iPhone-7',
        common_name: 'Silver iPhone 7®',
        type_name: 'iPhone 7®',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/1WuCX5fhP2MGmk4q2qOUoo/ba7245fafbbd8c557a2f6e349627528f/Silver_iPhone.png'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Common iPhone 7 Settings',
          active_date: '2018-06-18T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          score_settings: [
            {
              power: 99,
              speed: 587,
              passes: 1,
              focal_offset: null,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'High Quality',
                dev_id: 'high-quality'
              }
            }
          ],
          vector_engrave_settings: [
            {
              power: 99,
              speed: 8500,
              passes: null,
              focal_offset: null,
              scangap: 3,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              }
            }
          ],
          bitmap_engrave_settings: [
            {
              horizontal_timing: null,
              power: 99,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              },
              scangap: 3,
              minimum_gray_percent: null,
              passes: null
            }
          ]
        }
      ]
    },
    'Glowforge:9': {
      id: 'Glowforge:9',
      title: 'Maple Hardwood, 1/8"',
      sku: 'maple-hardwood-change-this',
      nominal_thickness: 3.175,
      thickness_name: 'Medium',
      variety: {
        name: 'maple-hardwood',
        common_name: 'Maple Hardwood',
        type_name: 'Maple Hardwood',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/6EHF2Qahb2Qg4g6cagaOag/6bebace4670f12b4277957c00a1ee740/Maple-Thumbnail.jpg'
        ],
        display_options: {
          thumbnail_contrast: [
            'dark'
          ],
          thumbnail_text_color: null
        }
      },
      settings: [
        {
          description: 'Medium Maple Hardwood Settings, Basic',
          active_date: '2017-04-06T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 965,
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
              speed: 8500,
              maximum_gray_percent: 85,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-updated'
              },
              scangap: 8,
              minimum_gray_percent: 0,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: 90,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-updated'
              },
              scangap: 3,
              minimum_gray_percent: 40,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 3833,
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
          description: 'Medium Maple Hardwood Settings, Pro',
          active_date: '2017-03-01T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 1168,
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
              speed: 8500,
              maximum_gray_percent: 85,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-updated'
              },
              scangap: 8,
              minimum_gray_percent: 0,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: 90,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-updated'
              },
              scangap: 3,
              minimum_gray_percent: 40,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 4600,
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
      ]
    },
    'Glowforge:60': {
      id: 'Glowforge:60',
      title: 'Silver MacBook Pro®',
      sku: 'Fake_SilverMacBookPro',
      nominal_thickness: 12.7,
      thickness_name: 'Silver',
      variety: {
        name: 'silver-macbook-pro',
        common_name: 'MacBook Pro®',
        type_name: 'MacBook Pro®',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/4t0hJPBmaIEA2acqog8MCO/96aaf044d3efd6174bdfe624f307302e/Silver_MacBook_Pro_Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Silver MacBook Pro - Pro Settings',
          active_date: '2018-02-01T00:00:00.000-08:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          score_settings: [
            {
              power: 40,
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
            }
          ],
          vector_engrave_settings: [
            {
              power: 100,
              speed: 8500,
              passes: null,
              focal_offset: null,
              scangap: 3,
              uses: [
                'default'
              ],
              display_color_mask: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              }
            }
          ],
          bitmap_engrave_settings: [
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: 95,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              },
              scangap: 3,
              minimum_gray_percent: 0,
              passes: null
            }
          ]
        }
      ]
    },
    'Glowforge:82': {
      id: 'Glowforge:82',
      title: 'Gold iPhone 7®',
      sku: 'Fake_GoldiPhone7',
      nominal_thickness: 7.3,
      thickness_name: 'Gold',
      variety: {
        name: 'gold-iPhone-7',
        common_name: 'Gold iPhone 7®',
        type_name: 'iPhone 7®',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/1LK1J9cSmYO6myoeGUsoGk/d1451eb1a3d1f892691acf3e497f9958/Gold_iPhone.png'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Common iPhone 7 Settings',
          active_date: '2018-06-18T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          score_settings: [
            {
              power: 99,
              speed: 587,
              passes: 1,
              focal_offset: null,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'High Quality',
                dev_id: 'high-quality'
              }
            }
          ],
          vector_engrave_settings: [
            {
              power: 99,
              speed: 8500,
              passes: null,
              focal_offset: null,
              scangap: 3,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              }
            }
          ],
          bitmap_engrave_settings: [
            {
              horizontal_timing: null,
              power: 99,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              },
              scangap: 3,
              minimum_gray_percent: null,
              passes: null
            }
          ]
        }
      ]
    },
    'Glowforge:61': {
      id: 'Glowforge:61',
      title: 'Glass Green Acrylic, 1/4"',
      sku: 'fake-glass-green-acrylic',
      nominal_thickness: 6,
      thickness_name: 'Thick',
      variety: {
        name: 'glass-green-acrylic',
        common_name: 'Glass Green Acrylic',
        type_name: 'Glass Green Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/6AG3p3Ofy8cIa2maquSKe0/b44ff3e38751f385295292122cb98c05/Glass-Green-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Thick Global Acrylic Settings, Pro',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 343,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        },
        {
          description: 'Thick Global Acrylic Settings, Basic',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 246,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
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
            },
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        }
      ]
    },
    'Glowforge:40': {
      id: 'Glowforge:40',
      title: 'Yellow Acrylic, 1/8" ',
      sku: 'yellow-acrylic-medium-fake',
      nominal_thickness: 3.175,
      thickness_name: 'Medium',
      variety: {
        name: 'medium-yellow-acrylic',
        common_name: 'Medium Yellow Acrylic',
        type_name: 'Yellow Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/2i3xli5oY00yy8MumOaics/da7edc7756fb719404d7759788e36f7f/Yellow-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Yellow Acrylic',
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
          description: 'Medium Yellow Acrylic, Pro',
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
              speed: 3480,
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
      ]
    },
    'Glowforge:51': {
      id: 'Glowforge:51',
      title: 'Black Acrylic, 1/4"',
      sku: 'thick-black-acrylic-fake',
      nominal_thickness: 6,
      thickness_name: 'Thick',
      variety: {
        name: 'thick-black-acrylic',
        common_name: 'Thick Black Acrylic',
        type_name: 'Black Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/2SGB0UrrmMIQOA6G4GMacE/c7385119ee2122dcf60f4866caba70cc/Black-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Thick Global Acrylic Settings, Pro',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 343,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        },
        {
          description: 'Thick Global Acrylic Settings, Basic',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 246,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
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
            },
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        }
      ]
    },
    'Glowforge:62': {
      id: 'Glowforge:62',
      title: 'Fluorescent Green Acrylic, 1/4"',
      sku: 'fake-fluorescent-green-acrylic',
      nominal_thickness: 6,
      thickness_name: 'Thick',
      variety: {
        name: 'thick-fluorescent-green-acrylic',
        common_name: 'Thick Fluorescent Green Acrylic',
        type_name: 'Fluorescent Green Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/l7PxjJeLN6QOM8kOY8MEw/efffdda0ed8a04f53dc579acc042b8b4/Fluoro-Green-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Thick Global Acrylic Settings, Pro',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 343,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        },
        {
          description: 'Thick Global Acrylic Settings, Basic',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 246,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
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
            },
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        }
      ]
    },
    'Glowforge:84': {
      id: 'Glowforge:84',
      title: 'Black iPhone 7®',
      sku: 'Fake_BlackiPhone7',
      nominal_thickness: 7.3,
      thickness_name: 'Black',
      variety: {
        name: 'black-iPhone-7',
        common_name: 'Black iPhone 7®',
        type_name: 'iPhone 7®',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/3Oas3b5gQ8gykKaqmS8CwK/1b8bc8e3464170b118ae9319e4d9d04d/Black_iPhone.png'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Common iPhone 7 Settings',
          active_date: '2018-06-18T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          score_settings: [
            {
              power: 99,
              speed: 587,
              passes: 1,
              focal_offset: null,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'High Quality',
                dev_id: 'high-quality'
              }
            }
          ],
          vector_engrave_settings: [
            {
              power: 99,
              speed: 8500,
              passes: null,
              focal_offset: null,
              scangap: 3,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              }
            }
          ],
          bitmap_engrave_settings: [
            {
              horizontal_timing: null,
              power: 99,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              },
              scangap: 3,
              minimum_gray_percent: null,
              passes: null
            }
          ]
        }
      ]
    },
    'Glowforge:41': {
      id: 'Glowforge:41',
      title: 'Fluorescent Blue Acrylic, 1/8"',
      sku: 'fluor-blue-acrylic-medium-fake',
      nominal_thickness: 3.175,
      thickness_name: 'Medium',
      variety: {
        name: 'medium-fluorescent-blue-acrylic',
        common_name: 'Medium Fluorescent Blue Acrylic',
        type_name: 'Fluorescent Blue Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/3LPsRuJn5m0aqmaaAK6kQ/ccb0fc31d354866f1127c49f0c83f9d2/Fluorescent-Blue.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Fluorescent Blue Acrylic, 1/8"',
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
            },
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
          description: 'Medium Fluorescent Blue  Acrylic, 1/8", Pro',
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
            },
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
      ]
    },
    'Glowforge:52': {
      id: 'Glowforge:52',
      title: 'Green Acrylic, 1/4"',
      sku: 'fake-green-acrylic',
      nominal_thickness: 6,
      thickness_name: 'Thick',
      variety: {
        name: 'thick-green-acrylic',
        common_name: 'Thick Green Acrylic',
        type_name: 'Green Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/4V2gfrKRPOWuMQS4CcCmeK/ccbcbeb1e3286732ca6dbd18d2477559/Green-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Thick Global Acrylic Settings, Pro',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 343,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        },
        {
          description: 'Thick Global Acrylic Settings, Basic',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 246,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
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
            },
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        }
      ]
    },
    'Glowforge:63': {
      id: 'Glowforge:63',
      title: 'Fluorescent Pink Acrylic, 1/4"',
      sku: 'think-pink-acrylic-fake',
      nominal_thickness: 6,
      thickness_name: 'Thick',
      variety: {
        name: 'thick-fluorescent-pink-acrylic',
        common_name: 'Thick Fluorescent Pink Acrylic',
        type_name: 'Fluorescent Pink Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/3lHYFPlkKcmAq84yU2OsEK/fae08d9b07e61ef3de0648f0321f0a23/Fluoro-Pink-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Thick Global Acrylic Settings, Pro',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 343,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        },
        {
          description: 'Thick Global Acrylic Settings, Basic',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 246,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
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
            },
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        }
      ]
    },
    'Glowforge:85': {
      id: 'Glowforge:85',
      title: 'Rose Gold iPhone 7®',
      sku: 'Fake_RoseGoldiPhone7',
      nominal_thickness: 7.3,
      thickness_name: 'Rose Gold',
      variety: {
        name: 'Rose-Gold-iPhone-7',
        common_name: 'Rose Gold iPhone 7®',
        type_name: 'iPhone 7®',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/5DwyJfL4886Ao2Y8uMKWGM/31eba399b90d581ac36867ddcc6f44ef/Rose_Gold_iPhone.png'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Common iPhone 7 Settings',
          active_date: '2018-06-18T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          score_settings: [
            {
              power: 99,
              speed: 587,
              passes: 1,
              focal_offset: null,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'High Quality',
                dev_id: 'high-quality'
              }
            }
          ],
          vector_engrave_settings: [
            {
              power: 99,
              speed: 8500,
              passes: null,
              focal_offset: null,
              scangap: 3,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              }
            }
          ],
          bitmap_engrave_settings: [
            {
              horizontal_timing: null,
              power: 99,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              },
              scangap: 3,
              minimum_gray_percent: null,
              passes: null
            }
          ]
        }
      ]
    },
    'Glowforge:42': {
      id: 'Glowforge:42',
      title: 'Fluorescent Green Acrylic, 1/8"',
      sku: 'fluor-green-acrylic-medium-fake',
      nominal_thickness: 3.175,
      thickness_name: 'Medium',
      variety: {
        name: 'medium-fluorescent-green-acrylic',
        common_name: 'Medium Fluorescent Green Acrylic',
        type_name: 'Fluorescent Green Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/l7PxjJeLN6QOM8kOY8MEw/efffdda0ed8a04f53dc579acc042b8b4/Fluoro-Green-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Fluorescent Green Acrylic, 1/8"',
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
            },
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
          description: 'Fluorescent Green  Acrylic, 1/8", Pro',
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
            },
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
      ]
    },
    'Glowforge:53': {
      id: 'Glowforge:53',
      title: 'White Acrylic, 1/4"',
      sku: 'thick-white-acrylic-fill-in',
      nominal_thickness: 6,
      thickness_name: 'Thick',
      variety: {
        name: 'thick-white-acrylic',
        common_name: 'Thick White Acrylic',
        type_name: 'White Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/BbJPDxvkGcMmkimM84MS4/2fa74355c78fcb6c93f967260316bd5f/White-Acrylic-Thumbnail.jpg'
        ],
        display_options: {
          thumbnail_contrast: [
            'light'
          ],
          thumbnail_text_color: null
        }
      },
      settings: [
        {
          description: 'Thick Global Acrylic Settings, Pro',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 343,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        },
        {
          description: 'Thick Global Acrylic Settings, Basic',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 246,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
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
            },
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        }
      ]
    },
    'Glowforge:86': {
      id: 'Glowforge:86',
      title: 'Just Black Google Pixel 2®',
      sku: 'Fake_BlackPixel2',
      nominal_thickness: 7.6,
      thickness_name: 'Just Black',
      variety: {
        name: 'black-google-pixel2',
        common_name: ' Just Black Google Pixel 2®',
        type_name: 'Pixel 2®',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/63g0EOg2642SqomYMKsc28/9856194f62b15b63c19a6811cf16efe3/Pixel_2_Black'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Black Pixel 2 Settings',
          active_date: '2018-06-18T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          score_settings: [
            {
              power: 80,
              speed: 587,
              passes: 3,
              focal_offset: null,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'High Quality',
                dev_id: 'high-quality'
              }
            }
          ],
          vector_engrave_settings: [
            {
              power: 99,
              speed: 8500,
              passes: 2,
              focal_offset: null,
              scangap: 3,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              }
            }
          ],
          bitmap_engrave_settings: [
            {
              horizontal_timing: null,
              power: 60,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              },
              scangap: 3,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        }
      ]
    },
    'Glowforge:31': {
      id: 'Glowforge:31',
      title: 'Black Acrylic, 1/8"',
      sku: 'medium-black-acrylic-fake',
      nominal_thickness: 3.175,
      thickness_name: 'Medium ',
      variety: {
        name: 'medium-black-acrylic',
        common_name: 'Medium Black Acrylic',
        type_name: 'Black Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/2SGB0UrrmMIQOA6G4GMacE/c7385119ee2122dcf60f4866caba70cc/Black-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Black Acrylic',
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
          description: 'Medium Black Acrylic, Pro',
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
      ]
    },
    'Glowforge:54': {
      id: 'Glowforge:54',
      title: 'Blue Acrylic, 1/4"',
      sku: 'fake-blue-acrylic',
      nominal_thickness: 6,
      thickness_name: 'Thick',
      variety: {
        name: 'thick-blue-acrylic',
        common_name: 'Thick Blue Acrylic',
        type_name: 'Blue Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/386bhcUiVGYkcaUCqeo2sU/85cf9f1e6824532d548168d5d959a987/Blue-Acrylic-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Thick Global Acrylic Settings, Pro',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 343,
            passes: null,
            focal_offset: null
          },
          score_settings: [
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        },
        {
          description: 'Thick Global Acrylic Settings, Basic',
          active_date: '2017-04-05T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 246,
            passes: 1,
            focal_offset: null
          },
          score_settings: [
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
            },
            {
              power: 16,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 31,
              display_color_mask: null,
              speed: 3833,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 70,
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
                name: 'Deep 3D Engrave',
                dev_id: 'deep-3d-engrave'
              },
              scangap: 4,
              minimum_gray_percent: null,
              passes: 2
            }
          ]
        }
      ]
    },
    'Glowforge:87': {
      id: 'Glowforge:87',
      title: 'Kinda Blue Google Pixel 2®',
      sku: 'FAKE_BluePixel2',
      nominal_thickness: 7.6,
      thickness_name: 'Kinda Blue',
      variety: {
        name: 'blue-google-pixel2',
        common_name: 'Kinda Blue Google Pixel 2®',
        type_name: 'Pixel 2®',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/16FXyKXJkuyMi2ay8w2Iia/30f2a3080206fe1fc8cf78a57ddbfd2f/Pixel_2_Blue'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Blue Pixel 2 Settings',
          active_date: '2018-06-18T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          score_settings: [
            {
              power: 99,
              speed: 587,
              passes: null,
              focal_offset: null,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'High Quality',
                dev_id: 'high-quality'
              }
            }
          ],
          vector_engrave_settings: [
            {
              power: 60,
              speed: 8500,
              passes: null,
              focal_offset: null,
              scangap: 3,
              uses: null,
              display_color_mask: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              }
            }
          ],
          bitmap_engrave_settings: [
            {
              horizontal_timing: null,
              power: 41,
              display_color_mask: null,
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Engrave',
                dev_id: 'hd-engrave'
              },
              scangap: 3,
              minimum_gray_percent: null,
              passes: null
            }
          ]
        }
      ]
    },
    'Glowforge:10': {
      id: 'Glowforge:10',
      title: 'Walnut Hardwood, 1/8"',
      sku: 'sku-walnut-hardwood-new',
      nominal_thickness: 3,
      thickness_name: 'Medium',
      variety: {
        name: 'walnut-hardwood',
        common_name: 'Walnut Hardwood',
        type_name: 'Walnut Hardwood',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/6xFe5SNotiqawi20YKOYqY/db6f10a1d7c9c7167cd87ef412d8bcee/Walnut-Thumbnail.jpg'
        ],
        display_options: null
      },
      settings: [
        {
          description: 'Medium Walnut Hardwood Settings',
          active_date: '2017-03-26T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 965,
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
              power: 6,
              speed: 1500,
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
              power: 6,
              display_color_mask: null,
              speed: 1500,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 11,
              display_color_mask: null,
              speed: 2433,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 40,
              passes: null
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 3366,
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
          description: 'Medium Walnut Hardwood Settings, Pro',
          active_date: '2017-03-01T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 1168,
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
              power: 6,
              speed: 1500,
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
              power: 6,
              display_color_mask: null,
              speed: 1500,
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
              speed: 8500,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: [
                'default'
              ],
              focal_offset: null,
              outcome: {
                name: 'Draft Photo',
                dev_id: 'draft-photo-new'
              },
              scangap: 8,
              minimum_gray_percent: null,
              passes: 1
            },
            {
              horizontal_timing: null,
              power: 11,
              display_color_mask: null,
              speed: 2433,
              maximum_gray_percent: null,
              rescale_method: 'LagrangeFilter',
              render_method: 'FloydSteinbergDitherMethod',
              uses: null,
              focal_offset: null,
              outcome: {
                name: 'HD Photo',
                dev_id: 'hd-photo-new'
              },
              scangap: 3,
              minimum_gray_percent: 40,
              passes: null
            },
            {
              horizontal_timing: null,
              power: 100,
              display_color_mask: null,
              speed: 4039,
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
      ]
    },
    'Glowforge:32': {
      id: 'Glowforge:32',
      title: 'White Acrylic, 1/8"',
      sku: 'medium-white-acrylic-fill-in',
      nominal_thickness: 3.175,
      thickness_name: 'Medium',
      variety: {
        name: 'medium-white-acrylic',
        common_name: 'Medium White Acrylic',
        type_name: 'White Acrylic',
        thumbnails: [
          '//images.ctfassets.net/ljtyf78xujn2/BbJPDxvkGcMmkimM84MS4/2fa74355c78fcb6c93f967260316bd5f/White-Acrylic-Thumbnail.jpg'
        ],
        display_options: {
          thumbnail_contrast: [
            'light'
          ],
          thumbnail_text_color: null
        }
      },
      settings: [
        {
          description: 'Medium White Acrylic Settings',
          active_date: '2017-04-14T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'basic',
          cut_setting: {
            power: 100,
            speed: 762,
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
          description: 'Medium White Acrylic Settings, Pro',
          active_date: '2017-04-14T00:00:00.000-07:00',
          environment: [
            'staging',
            'production'
          ],
          tube_type: 'pro',
          cut_setting: {
            power: 100,
            speed: 914,
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
      ]
    }
  }
};
