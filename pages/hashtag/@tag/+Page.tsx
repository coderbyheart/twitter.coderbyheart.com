import { useData } from 'vike-react/useData'
import Tweet from '../../Tweet'
import type { Data } from './+data'

export default function Page() {
	const { tag, tweets } = useData<Data>()
	return (
		<>
			<div className="breadcrumbs">
				<a href="/">Home</a> / <a href="/hashtag">Hashtags</a> / #{tag}
			</div>
			<h1>#{tag}</h1>
			<p className="count">{tweets.length.toLocaleString()} tweets</p>
			{tweets.map((t) => (
				<Tweet key={t.id} tweet={t} />
			))}
		</>
	)
}
