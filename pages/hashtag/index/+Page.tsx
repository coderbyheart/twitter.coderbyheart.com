import { useData } from 'vike-react/useData'
import type { Data } from './+data'

export default function Page() {
	const { hashtags } = useData<Data>()
	return (
		<>
			<div className="breadcrumbs">
				<a href="/">Home</a> / Hashtags
			</div>
			<h1>Hashtags</h1>
			<p>{hashtags.length.toLocaleString()} hashtags.</p>
			<ul className="hashtag-list">
				{hashtags.map((h) => (
					<li key={h.slug}>
						<a href={`/hashtag/${encodeURIComponent(h.slug)}`}>#{h.tag}</a>
						<span className="count">{h.count.toLocaleString()}</span>
					</li>
				))}
			</ul>
		</>
	)
}
