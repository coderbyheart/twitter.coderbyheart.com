import { getHashtagIndex } from '../../../src/tweets'

export default function onBeforePrerenderStart(): string[] {
	return getHashtagIndex().map((h) => `/hashtag/${encodeURIComponent(h.slug)}`)
}
