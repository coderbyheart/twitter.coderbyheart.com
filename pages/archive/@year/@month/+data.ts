import { render } from 'vike/abort'
import type { PageContextServer } from 'vike/types'
import { renderTweets } from '../../../../src/format'
import { getTweetsByMonth } from '../../../../src/tweets'
import type { RenderedTweet } from '../../../../src/types'

export type Data = {
	year: string
	month: string
	tweets: RenderedTweet[]
}

export const data = (pageContext: PageContextServer): Data => {
	const { year, month } = pageContext.routeParams as {
		year: string
		month: string
	}
	const tweets = getTweetsByMonth(year, month)
	if (tweets.length === 0) throw render(404)
	return { year, month, tweets: renderTweets(tweets) }
}
