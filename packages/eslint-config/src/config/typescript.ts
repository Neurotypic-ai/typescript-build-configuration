import importXPlugin from 'eslint-plugin-import-x';
import tseslint from 'typescript-eslint';

import { noDynamicImports } from '../rules/index';

import type { TSESLint } from '@typescript-eslint/utils';

// TypeScript base configuration - extract the actual rule configs
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- noUncheckedIndexedAccess requires assertion
const tsStrictTypeChecked = tseslint.configs.strictTypeChecked[2]!;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- noUncheckedIndexedAccess requires assertion
const tsStylisticTypeChecked = tseslint.configs.stylisticTypeChecked[2]!;

/**
 * Creates the TypeScript ESLint configuration
 * @param tsconfigRootDir - Optional root directory for TypeScript config resolution
 */
export function createTsConfig(tsconfigRootDir?: string): TSESLint.FlatConfig.Config {
  return {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'import-x': importXPlugin,
      'neurotypic-ai': {
        rules: {
          'no-dynamic-imports': noDynamicImports,
        },
      },
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        ...(tsconfigRootDir && { tsconfigRootDir }),
      },
    },
    settings: {
      'import-x/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      ...importXPlugin.configs.recommended.rules,
      ...importXPlugin.configs.typescript.rules,

      ...tsStrictTypeChecked.rules,
      ...tsStylisticTypeChecked.rules,

      'import-x/order': 'off',

      // Custom TypeScript rules
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/only-throw-error': [
        'error',
        {
          allow: [
            { from: 'lib', name: 'Response' },
            { from: 'package', name: 'redirect', package: 'react-router' },
          ],
          allowThrowingAny: false,
          allowThrowingUnknown: false,
        },
      ],

      // Custom Neurotypic-ai rules
      'neurotypic-ai/no-dynamic-imports': 'error',
    },
  };
}
