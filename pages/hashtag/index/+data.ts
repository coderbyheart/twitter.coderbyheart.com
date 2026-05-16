import { getHashtagIndex } from '../../../src/tweets'

export type Data = {
	hashtags: ReturnType<typeof getHashtagIndex>
}

export const data = (): Data => ({ hashtags: getHashtagIndex() })
