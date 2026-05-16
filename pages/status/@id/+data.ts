import { render } from 'vike/abort'
import type { PageContextServer } from 'vike/types'
import { renderTweet, renderTweets } from '../../../src/format'
import { getReplyChain, getTweet } from '../../../src/tweets'
import type { RenderedTweet } from '../../../src/types'

export type Data = {
	tweet: RenderedTweet
	replies: RenderedTweet[]
}

export const data = (pageContext: PageContextServer): Data => {
	const id = pageContext.routeParams!.id
	const tweet = getTweet(id)
	if (!tweet) throw render(404)
	return {
		tweet: renderTweet(tweet),
		replies: renderTweets(getReplyChain(id)),
	}
}
