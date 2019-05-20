const material = {
  'Custom:2': {
    id: 'Custom:2',
    nominal_thickness: '6',
    settings: [
      {
        active_date: '2017-04-06T00:00-07:00',
        bitmap_engrave_settings: [],
        cut_setting: {
          focal_offset: null,
          passes: 1,
          power: 9.9,
          speed: 1562.5
        },
        description: 'Touch Of Green Settings',
        environment: [
          'production'
        ],
        score_settings: [
          {
            display_color_mask: null,
            focal_offset: null,
            outcome: {
              dev_id: 'light-green',
              name: 'Light Green'
            },
            passes: 1,
            power: 99,
            speed: 100,
            uses: null
          }
        ],
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
          speed: 1562.5
        },
        description: 'Touch Of Green Settings',
        environment: [
          'production'
        ],
        score_settings: [
          {
            display_color_mask: null,
            focal_offset: null,
            outcome: {
              dev_id: 'light-green',
              name: 'Light Green'
            },
            passes: 1,
            power: 99,
            speed: 100,
            uses: null
          }
        ],
        tube_type: 'pro',
        vector_engrave_settings: []
      }
    ],
    sku: '',
    thickness_name: 'Touch',
    title: 'Touch Of Green',
    variety: {
      common_name: 'Touch Of Green',
      display_options: null,
      name: 'touch-of-green',
      thumbnails: [
        'chrome-extension://ikjgmgfhgelagijhaagpdbcbkmpckpda/custom-material.png'
      ],
      type_name: 'Of Green'
    },
    selected: true
  }
}
console.log(JSON.stringify(material));
