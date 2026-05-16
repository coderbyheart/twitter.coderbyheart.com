import vikeReact from 'vike-react/config'
import type { Config } from 'vike/types'
import Layout from './Layout'

export default {
	extends: vikeReact,
	Layout,
	title: '@coderbyheart on Twitter',
	description: "Markus Tacker's Twitter archive",
	passToClient: [],
	// Disable client-side hydration — fully static HTML output.
	stream: false,
	prerender: true,
} satisfies Config
