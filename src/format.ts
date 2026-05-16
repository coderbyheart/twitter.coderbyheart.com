import { marked } from 'marked'
import { hasHashtagPage } from './tweets'

const MONTH_NAMES = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

export function monthName(month: string): string {
	const idx = parseInt(month, 10) - 1
	return MONTH_NAMES[idx] ?? month
}

export function formatDate(iso: string): string {
	const d = new Date(iso)
	return d.toUTCString().replace(' GMT', ' UTC')
}

const SELF_TWEET_RE =
	/^https?:\/\/(?:www\.|mobile\.)?twitter\.com\/coderbyheart\/status\/(\d+)/i

function rewriteSelfTweetHref(href: string): string {
	const match = SELF_TWEET_RE.exec(href)
	return match ? `/status/${match[1]}` : href
}

const renderer = new marked.Renderer()
const origImage = renderer.image.bind(renderer)
renderer.image = function ({ href, title, text }) {
	if (href?.endsWith('.mp4') || href?.endsWith('.webm')) {
		return `<video src="${href}" controls preload="metadata" class="tweet-media"></video>`
	}
	return `<img src="${href ?? ''}" alt="${text ?? ''}"${title ? ` title="${title}"` : ''} loading="lazy" class="tweet-media" />`
}

const origLink = renderer.link.bind(renderer)
renderer.link = function (token) {
	const href = token.href ?? ''
	const rewritten = rewriteSelfTweetHref(href)
	if (rewritten === href) return origLink(token)
	const next = { ...token, href: rewritten }
	if (token.text === href) {
		next.text = rewritten
		next.tokens = [{ type: 'text', raw: rewritten, text: rewritten }]
	}
	return origLink(next)
}

const HASHTAG_START_RE = /(?:^|[^\p{L}\p{N}_/&])#[\p{L}_][\p{L}\p{N}_]*/u
const HASHTAG_TOKEN_RE = /^#([\p{L}_][\p{L}\p{N}_]*)/u

marked.use({
	extensions: [
		{
			name: 'hashtag',
			level: 'inline',
			start(src: string): number | undefined {
				const m = HASHTAG_START_RE.exec(src)
				if (!m) return undefined
				return (m.index ?? 0) + (m[0].startsWith('#') ? 0 : 1)
			},
			tokenizer(src: string) {
				const m = HASHTAG_TOKEN_RE.exec(src)
				if (!m) return undefined
				return {
					type: 'hashtag',
					raw: m[0],
					tag: m[1],
				}
			},
			renderer(token): string {
				const tag = (token as unknown as { tag: string }).tag
				const slug = tag.toLowerCase()
				if (!hasHashtagPage(slug)) return `#${tag}`
				return `<a class="hashtag" href="/hashtag/${encodeURIComponent(slug)}">#${tag}</a>`
			},
		},
	],
})

marked.setOptions({
	gfm: true,
	breaks: true,
	renderer,
})

export function renderMarkdown(md: string): string {
	return marked.parse(md, { async: false }) as string
}
