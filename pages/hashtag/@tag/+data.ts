import { render } from 'vike/abort'
import type { PageContextServer } from 'vike/types'
import { getTweetsByHashtag, type Tweet } from '../../../src/tweets'

export type Data = {
	tag: string
	slug: string
	tweets: Tweet[]
}

export const data = (pageContext: PageContextServer): Data => {
	const slug = decodeURIComponent(pageContext.routeParams!.tag).toLowerCase()
	const entry = getTweetsByHashtag(slug)
	if (!entry) throw render(404)
	return { tag: entry.display, slug, tweets: entry.tweets }
}
