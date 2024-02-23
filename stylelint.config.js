module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: [
    'stylelint-scss',
    'stylelint-order',
    'stylelint-config-rational-order/plugin',
  ],
  rules: {
    'scss/at-import-partial-extension': 'always',
    'order/properties-order': [[], { severity: 'warning' }],
    // `standard` conflict with `rational-order`
    'declaration-empty-line-before': [
      'never',
      {
        except: ['after-comment', 'after-declaration', 'first-nested'],
        ignore: [
          'after-comment',
          'after-declaration',
          'first-nested',
          'inside-single-line-block',
        ],
      },
    ],
    'plugin/rational-order': [
      true,
      {
        'border-in-box-model': false,
        'empty-line-between-groups': true,
        severity: 'warning',
      },
    ],
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx', 'upx'],
      },
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignore: ['custom-elements'],
        ignoreTypes: [
          'page',
          'text',
          'view',
          'swiper',
          'swiper-item',
          'image',
          'navigator',
        ],
      },
    ],
    'no-empty-source': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'font-family-no-missing-generic-family-keyword': [
      true,
      {
        ignoreFontFamilies: ['Roboto-BoldCondensedItalic', 'icomoon', 'Roboto'],
      },
    ],
  },
}
