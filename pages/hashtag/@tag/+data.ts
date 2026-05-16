import { render } from 'vike/abort'
import type { PageContextServer } from 'vike/types'
import { renderTweets } from '../../../src/format'
import { getTweetsByHashtag } from '../../../src/tweets'
import type { RenderedTweet } from '../../../src/types'

export type Data = {
	tag: string
	slug: string
	tweets: RenderedTweet[]
}

export const data = (pageContext: PageContextServer): Data => {
	const slug = decodeURIComponent(pageContext.routeParams!.tag).toLowerCase()
	const entry = getTweetsByHashtag(slug)
	if (!entry) throw render(404)
	return { tag: entry.display, slug, tweets: renderTweets(entry.tweets) }
}
