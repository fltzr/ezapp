import sheriff from 'eslint-config-sheriff';
import { defineFlatConfig } from 'eslint-define-config';

/**
 * @type {import('@sherifforg/types').SheriffSettings}
 */
const sheriffOptions = {
  files: ['**/*.{ts,tsx}'],
  pathsOveriddes: {
    tsconfigLocation: ['./tsconfig.json', './tsconfig.node.json'],
  },
  ignores: {
    inheritedFromGitIgnore: true,
    recommended: true,
  },
  react: true,
  lodash: true,
  vitest: true,
};

export default defineFlatConfig([
  ...sheriff(sheriffOptions),
  {
    rules: {
      'react/no-multi-comp': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        {
          ignoreArrowShorthand: true,
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'import/no-named-as-default': 'off',
      'arrow-return-style/arrow-return-style': 'off',
    },
  },
]);
