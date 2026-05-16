import matter from 'gray-matter'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const STATUS_DIR = join(process.cwd(), 'status')

export interface TweetFrontmatter {
	favorite_count?: number
	retweet_count?: number
	created_at: string
	lang?: string
	full_text?: string
	in_reply_to_screen_name?: string
	in_reply_to_status_id_str?: string
	replies?: string[]
	video_aspect_ratio?: number
}

export interface Tweet {
	id: string
	body: string
	data: TweetFrontmatter
	year: string
	month: string
}

let cache: Map<string, Tweet> | null = null
let sortedCache: Tweet[] | null = null

export function loadAllTweets(): Map<string, Tweet> {
	if (cache) return cache
	const files = readdirSync(STATUS_DIR).filter((f) => f.endsWith('.md'))
	const map = new Map<string, Tweet>()
	for (const file of files) {
		const id = file.replace(/\.md$/, '')
		const raw = readFileSync(join(STATUS_DIR, file), 'utf8')
		const parsed = matter(raw)
		const data = parsed.data as TweetFrontmatter
		if (!data.created_at) continue
		const d = new Date(data.created_at)
		const year = String(d.getUTCFullYear())
		const month = String(d.getUTCMonth() + 1).padStart(2, '0')
		map.set(id, {
			id,
			body: parsed.content.trim(),
			data,
			year,
			month,
		})
	}
	cache = map
	return cache
}

export function getTweetsSorted(): Tweet[] {
	if (sortedCache) return sortedCache
	const all = [...loadAllTweets().values()]
	all.sort(
		(a, b) =>
			new Date(b.data.created_at).getTime() -
			new Date(a.data.created_at).getTime(),
	)
	sortedCache = all
	return sortedCache
}

export function getYearIndex(): {
	year: string
	count: number
	months: { month: string; count: number }[]
}[] {
	const years = new Map<string, Map<string, number>>()
	for (const t of loadAllTweets().values()) {
		let y = years.get(t.year)
		if (!y) {
			y = new Map()
			years.set(t.year, y)
		}
		y.set(t.month, (y.get(t.month) ?? 0) + 1)
	}
	const result = [...years.entries()].map(([year, months]) => {
		const monthsArr = [...months.entries()]
			.map(([month, count]) => ({ month, count }))
			.sort((a, b) => a.month.localeCompare(b.month))
		const count = monthsArr.reduce((s, m) => s + m.count, 0)
		return { year, count, months: monthsArr }
	})
	result.sort((a, b) => b.year.localeCompare(a.year))
	return result
}

export function getMostLiked(limit: number): Tweet[] {
	return [...loadAllTweets().values()]
		.sort((a, b) => {
			const diff = (b.data.favorite_count ?? 0) - (a.data.favorite_count ?? 0)
			if (diff !== 0) return diff
			return (
				new Date(b.data.created_at).getTime() -
				new Date(a.data.created_at).getTime()
			)
		})
		.slice(0, limit)
}

export function getTweetsByMonth(year: string, month: string): Tweet[] {
	return getTweetsSorted()
		.filter((t) => t.year === year && t.month === month)
		.sort(
			(a, b) =>
				new Date(a.data.created_at).getTime() -
				new Date(b.data.created_at).getTime(),
		)
}

export function getTweet(id: string): Tweet | undefined {
	return loadAllTweets().get(id)
}

export function getReplyChain(id: string): Tweet[] {
	const out: Tweet[] = []
	const seen = new Set<string>()
	const walk = (rootId: string) => {
		const t = getTweet(rootId)
		if (!t) return
		for (const replyId of t.data.replies ?? []) {
			if (seen.has(replyId)) continue
			seen.add(replyId)
			const reply = getTweet(replyId)
			if (!reply) continue
			out.push(reply)
			walk(replyId)
		}
	}
	walk(id)
	return out
}
