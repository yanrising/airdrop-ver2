require("dotenv").config();

export default {
	/*
	 ** Environment variables
	 */
	env: {
		NUXT_ENV_HOST: process.env.NUXT_ENV_HOST,
		NUXT_ENV_APP_NAME: process.env.NUXT_ENV_APP_NAME,
		API_ENDPOINT: process.env.API_ENDPOINT,
		NUXT_ENV_MORALIS_SERVER_URL: process.env.NUXT_ENV_MORALIS_SERVER_URL,
		NUXT_ENV_MORALIS_APPLICATION_ID: process.env.NUXT_ENV_MORALIS_APPLICATION_ID,
		NUXT_ENV_FIREBASE_API_KEY: process.env.NUXT_ENV_FIREBASE_API_KEY,
		NUXT_ENV_FIREBASE_AUTH_DOMAIN: process.env.NUXT_ENV_FIREBASE_AUTH_DOMAIN,
		NUXT_ENV_FIREBASE_PROJECT_ID: process.env.NUXT_ENV_FIREBASE_PROJECT_ID,
		NUXT_ENV_FIREBASE_STORAGE_BUCKET: process.env.NUXT_ENV_FIREBASE_STORAGE_BUCKET,
		NUXT_ENV_FIREBASE_MESSAGING_SENDER_ID: process.env.NUXT_ENV_FIREBASE_MESSAGING_SENDER_ID,
		NUXT_ENV_FIREBASE_APP_ID: process.env.NUXT_ENV_FIREBASE_APP_ID,
		NUXT_ENV_FIREBASE_MEASUREMENT_ID: process.env.NUXT_ENV_FIREBASE_MEASUREMENT_ID,
	},
	/*
	 ** Application mode
	 */
	// mode: 'spa',
	ssr: false,
	target: 'static',
	/*
	 ** Define the source directory
	 */
	// srcDir: resolve(__dirname, "./"),
	/*
	 ** Custom server
	 */
	server: {
		port: process.env.PORT || 8001,
		host: process.env.NUXT_ENV_HOST || "localhost"
	},
	/*
	 ** Headers of the page
	 */
	head: {
		title: `${process.env.NUXT_ENV_APP_NAME}`,
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				hid: "description",
				name: "description",
				content: process.env.NUXT_ENV_APP_DESCRIPTION
			}
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico", sizes: "192x192" },
			{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;700;900&display=swap' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap' } 
		]
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: "#fff" },
	/*
	 ** Global CSS
	 */
	css: ["~/assets/themes/custom-antd.less", "@/assets/scss/main.scss"],
	/*
	 ** Custom router
	 */
	router: {
		middleware: "i18n"
	},
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		'@/plugins/config',
		"@/plugins/antd-ui",
		// '@/plugins/i18n',
		'@/plugins/axios',
		"@/plugins/filters",
		"@/plugins/v-fragment",
		'@/plugins/moralis',
	],
	/*
	 ** Create the dynamic routes
	 */
	generate: {
		dir: 'dist'

		// routes: ['/', '/fr']
	},
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: ["@nuxt/typescript-build", "@nuxtjs/dotenv"],
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		'@nuxtjs/axios',
	],
	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) { },

		loaders: {
			less: {
				lessOptions: {
					javascriptEnabled: true
				}
			}
		}
	},
	generate: {
		fallback: true,
	}
};
