import { renderTweets } from '../../src/format'
import { getMostLiked, getYearIndex } from '../../src/tweets'
import type { RenderedTweet } from '../../src/types'

export type Data = {
	topLiked: RenderedTweet[]
	totalTweets: number
	years: ReturnType<typeof getYearIndex>
}

export const data = (): Data => {
	const years = getYearIndex()
	return {
		topLiked: renderTweets(getMostLiked(50)),
		totalTweets: years.reduce((s, y) => s + y.count, 0),
		years,
	}
}
