// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeFlexoki from 'starlight-theme-flexoki'
import starlightBlog from 'starlight-blog'

// https://astro.build/config
export default defineConfig({
	site: 'https://minecraft-development-directories.github.io',
	integrations: [
		starlight({
			title: 'Minecraft Development Directories',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Minecraft-Development-Directories' }],
			plugins: [starlightThemeFlexoki(), starlightBlog()],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
