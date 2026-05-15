import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Elo Orgânico',
  tagline: 'Professional management for a sustainable organic economy.',
  favicon: 'favicon.ico',

  // Set the production url of your site here
  url: 'https://elo-organico.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/elo-organico/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'tupynambalucas', // Usually your GitHub org/user name.
  projectName: 'elo-organico', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  themes: ['@docusaurus/theme-live-codeblock', '@docusaurus/theme-mermaid'],

  markdown: {
    mermaid: true,
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-BR'],
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
      'pt-BR': {
        label: 'Português (Brasil)',
        htmlLang: 'pt-BR',
      },
    },
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          path: 'releases',
          routeBasePath: 'changelog',
          blogTitle: 'Changelog',
          blogDescription:
            'Acompanhe as últimas atualizações, melhorias e correções do Elo Orgânico.',
          blogSidebarTitle: 'Todas as versões',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: ['./src/css/custom.css'],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'eloornico/svg/logo-negative.svg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'EloDocs',
      logo: {
        alt: 'Elo Orgânico Logo',
        src: 'eloornico/svg/logo-negative.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        { to: '/studio', label: 'Studio', position: 'left' },
        { to: '/tools', label: 'Tools', position: 'left' },
        { to: '/changelog', label: 'Changelog', position: 'right' },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/tupynambalucas/elo-organico',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Architecture',
              to: '/docs/engineering/architecture',
            },
            {
              label: 'Style Guide',
              to: '/docs/engineering/styleguide',
            },
            {
              label: 'Cheat Sheet',
              to: '/docs/cheat-sheet',
            },
          ],
        },
        {
          title: 'Ecosystem',
          items: [
            {
              label: 'Studio (Design)',
              to: '/studio',
            },
            {
              label: 'Tools (CLI)',
              to: '/tools',
            },
            {
              label: 'Instance (Shop)',
              href: 'https://github.com/tupynambalucas/elo-organico',
            },
            {
              label: 'Portal (SaaS)',
              href: 'https://github.com/tupynambalucas/elo-organico',
            },
          ],
        },
        {
          title: 'Product',
          items: [
            {
              label: 'Vision',
              to: '/docs/product/vision',
            },
            {
              label: 'Master Plan',
              to: '/docs/product/masterplan',
            },
            {
              label: 'Roadmap',
              to: '/docs/product/roadmap',
            },
          ],
        },
      ],
      copyright: `
        <div class="footer__banner-container">
          <img src="/elo-organico/eloornico/svg/banner-negative.svg" alt="Elo Orgânico" class="footer__banner" />
        </div>
        <p>Copyright © ${new Date().getFullYear()} Elo Orgânico. Professional management for a sustainable organic economy. Built with Docusaurus.</p>
      `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    mermaid: {
      theme: { light: 'neutral', dark: 'forest' },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
