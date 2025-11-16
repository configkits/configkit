import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'ConfigKits',
  description: 'Configuration-driven rendering framework',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API Reference', link: '/api/' },
      { text: 'Examples', link: '/examples/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' },
          ],
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Configuration Schema', link: '/guide/schema' },
            { text: 'Components', link: '/guide/components' },
            { text: 'Feature Flags', link: '/guide/feature-flags' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'Packages',
          items: [
            { text: '@configkits/core', link: '/api/core' },
            { text: '@configkits/react', link: '/api/react' },
            { text: '@configkits/flags', link: '/api/flags' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/configkits/configkit' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 ConfigKits',
    },
  },
});

