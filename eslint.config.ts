import path from 'node:path';
import { fileURLToPath } from 'node:url';

import eslint from '@eslint/js';
import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

type EslintPlugin = NonNullable<Linter.Config['plugins']>[string];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // ========================================================================
  // 1. CONFIGURAÇÃO GLOBAL - Base para todo o monorepo (Rigor Máximo)
  // ========================================================================
  {
    name: 'monorepo/global-typescript-config',
    files: ['**/*.{js,mjs,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['vite.config.ts'],
        },
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: [
            'tsconfig.json',
            'instance/apps/*/tsconfig.json',
            'instance/packages/*/tsconfig.json',
            'portal/apps/*/tsconfig.json',
            'portal/packages/*/tsconfig.json',
            'shared/*/tsconfig.json',
            'studio/tsconfig.json',
          ],
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      'import/ignore': [
        '.css$',
        '.scss$',
        '.sass$',
        '.less$',
        '.styl$',
        '.module.(css|scss|sass|less|styl)$',
      ],
    },
    rules: {
      // 🔴 REGRAS CRÍTICAS - Previnem bugs em produção
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],

      // 🟡 REGRAS IMPORTANTES - Qualidade & Padronização
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/naming-convention': 'off',

      // 🟢 REGRAS DE IMPORTAÇÃO
      'import/no-duplicates': 'warn',
      'import/no-unresolved': [
        'error',
        {
          ignore: [
            '.css$',
            '.scss$',
            '.sass$',
            '.less$',
            '.styl$',
            '.module.(css|scss|sass|less|styl)$',
          ],
        },
      ],
      'import/order': 'off',
      'import/newline-after-import': 'off',
      'import/first': 'off',
      'import/no-default-export': 'off',
    },
  },

  // ========================================================================
  // 2. CONFIG FILES - Suporte para Ferramentas na Raiz
  // ========================================================================
  {
    name: 'monorepo/root-config-files',
    files: ['*.{js,mjs,ts}', '*.config.{js,mjs,ts}'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },

  // ========================================================================
  // 3. STRICT DOMAIN ISOLATION - Enforce Bounded Contexts
  // ========================================================================
  {
    name: 'monorepo/domain-isolation-instance',
    files: ['instance/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@elo-portal/*'],
              message:
                'Cross-context import detected: The Instance context must not import from the Portal context. Maintain Bounded Context isolation.',
            },
          ],
        },
      ],
    },
  },
  {
    name: 'monorepo/domain-isolation-portal',
    files: ['portal/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@elo-instance/*'],
              message:
                'Cross-context import detected: The Portal context must not import from the Instance context. Maintain Bounded Context isolation.',
            },
          ],
        },
      ],
    },
  },

  // ========================================================================
  // 4. DOMAIN CORE - Regras para @elo-*/core (Strict Logic)
  // ========================================================================
  {
    name: 'monorepo/domain-core',
    files: ['**/packages/core/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
    },
  },

  // ========================================================================
  // 4. DOMAIN API - Regras para Backend (Fastify)
  // ========================================================================
  {
    name: 'monorepo/domain-api',
    files: ['**/apps/api/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
      'no-process-env': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  // ========================================================================
  // 5. DOMAIN WEB - Regras para Frontend (React/Vite)
  // ========================================================================
  {
    name: 'monorepo/domain-web',
    files: ['**/apps/web/**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin as unknown as EslintPlugin,
      'react-refresh': reactRefreshPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'warn',
      'react/no-array-index-key': 'warn',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-key': ['error', { checkFragmentShorthand: true }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'error',
    },
  },

  // ========================================================================
  // 6. TEST FILES - Regras Relaxadas para Testes
  // ========================================================================
  {
    name: 'monorepo/test-files',
    files: ['**/*.{test,spec}.{js,mjs,ts,tsx}', '**/__tests__/**/*.{js,mjs,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      'no-console': 'off',
    },
  },

  // ========================================================================
  // 7. IGNORES GLOBAIS
  // ========================================================================
  {
    name: 'monorepo/ignores',
    ignores: [
      'knowledge-base/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/build/**',
      '**/.next/**',
      '**/coverage/**',
      '**/.turbo/**',
      '**/.eslintcache',
      '**/*.json',
      '**/*.css',
      '**/*.scss',
      '**/*.sass',
      '**/*.less',
      '**/*.styl',
      'mongo-keyfile',
      'docker-compose*.yaml',
      '**/types/**/*.d.ts',
      '**/*.d.ts',
      '**/vite-env.d.ts',
    ],
  },
]);
