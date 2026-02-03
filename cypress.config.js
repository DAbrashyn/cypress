const { defineConfig } = require('cypress');

module.exports = defineConfig({
	projectId: 'jztgsx',
	reporter: 'cypress-mochawesome-reporter',
	reporterOptions: {
		reportDir: 'cypress/reports',
		charts: true,
		reportPageTitle: 'Test Report',
		embeddedScreenshots: true,
		inlineAssets: true,
	},
	e2e: {
		//baseUrl: 'https://demoqa.com/webtables',
		defaultCommandTimeout: 10000,
		viewportHeight: 900,
		viewportWidth: 1440,
		setupNodeEvents(on, config) {
			require('cypress-mochawesome-reporter/plugin')(on);

			const version = config.env.version || 'prod';
			const settings = require(`./config/${version}.config.json`);

			config.baseUrl = settings.baseUrl;
			config.env = { ...config.env, ...settings.env };

			return config;
		},
	},
});
