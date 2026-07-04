import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { getHashtagIndex, getYearIndex, loadAllTweets } from '../src/tweets.ts'

const BASE_URL = 'https://twitter.coderbyheart.com'
const OUT_FILE = join(process.cwd(), 'dist', 'client', 'sitemap.xml')

function collectPaths(): string[] {
	const paths = ['/', '/archive/', '/hashtag/']

	for (const y of getYearIndex()) {
		paths.push(`/archive/${y.year}`)
		for (const m of y.months) paths.push(`/archive/${y.year}/${m.month}`)
	}

	for (const h of getHashtagIndex())
		paths.push(`/hashtag/${encodeURIComponent(h.slug)}`)

	for (const id of loadAllTweets().keys()) paths.push(`/status/${id}`)

	return paths
}

// GitHub Pages redirects `/path` to `/path/`, so emit trailing slashes to
// avoid an unnecessary redirect hop for every URL.
const withTrailingSlash = (p: string): string => (p.endsWith('/') ? p : `${p}/`)

function toSitemap(paths: string[]): string {
	const urls = paths
		.map((p) => `\t<url><loc>${BASE_URL}${withTrailingSlash(p)}</loc></url>`)
		.join('\n')
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

const paths = collectPaths()
writeFileSync(OUT_FILE, toSitemap(paths), 'utf8')
console.log(`Wrote ${paths.length} URLs to ${OUT_FILE}`)
