import { render } from 'vike/abort'
import type { PageContextServer } from 'vike/types'
import { getReplyChain, getTweet, type Tweet } from '../../../src/tweets'

export type Data = {
	tweet: Tweet
	replies: Tweet[]
}

export const data = (pageContext: PageContextServer): Data => {
	const id = pageContext.routeParams!.id
	const tweet = getTweet(id)
	if (!tweet) throw render(404)
	return { tweet, replies: getReplyChain(id) }
}
