import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

import type { TSESLint } from '@typescript-eslint/utils';

export const reactConfig: TSESLint.FlatConfig.Config = {
  files: ['**/*.{jsx,tsx}'],
  plugins: {
    react: reactPlugin,
    'jsx-a11y': jsxA11yPlugin,
    'react-hooks': reactHooksPlugin,
  },
  rules: {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- noUncheckedIndexedAccess
    ...(reactPlugin.configs.flat?.['recommended']?.rules ?? {}),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- noUncheckedIndexedAccess
    ...(reactPlugin.configs.flat?.['jsx-runtime']?.rules ?? {}),
    ...reactHooksPlugin.configs.recommended.rules,
    ...jsxA11yPlugin.flatConfigs.recommended.rules,
    'react/jsx-no-leaked-render': ['warn', { validStrategies: ['ternary'] }],
  },
  settings: {
    react: {
      version: '19',
    },
    formComponents: ['Form'],
    linkComponents: [
      { name: 'Link', linkAttribute: 'to' },
      { name: 'NavLink', linkAttribute: 'to' },
    ],
  },
};
