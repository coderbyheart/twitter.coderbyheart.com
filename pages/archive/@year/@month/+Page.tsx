import { useData } from 'vike-react/useData'
import { monthName } from '../../../../src/format'
import Tweet from '../../../Tweet'
import type { Data } from './+data'

export default function Page() {
	const { year, month, tweets } = useData<Data>()
	return (
		<>
			<div className="breadcrumbs">
				<a href="/">Home</a> / <a href="/archive">Archive</a> /{' '}
				<a href={`/archive/${year}`}>{year}</a> / {monthName(month)}
			</div>
			<h1>
				{monthName(month)} {year}
			</h1>
			<p className="count">{tweets.length.toLocaleString()} tweets</p>
			{tweets.map((t) => (
				<Tweet key={t.id} tweet={t} />
			))}
		</>
	)
}
