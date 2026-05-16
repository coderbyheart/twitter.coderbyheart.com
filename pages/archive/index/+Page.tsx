import { useData } from 'vike-react/useData'
import type { Data } from './+data'

export default function Page() {
	const { years } = useData<Data>()
	const total = years.reduce((s, y) => s + y.count, 0)
	return (
		<>
			<div className="breadcrumbs">
				<a href="/">Home</a> / Archive
			</div>
			<h1>Archive</h1>
			<p>
				{total.toLocaleString()} tweets across {years.length} years.
			</p>
			<div className="year-grid">
				{years.map((y) => (
					<a key={y.year} className="year-card" href={`/archive/${y.year}`}>
						<div className="year">{y.year}</div>
						<div className="count">{y.count.toLocaleString()} tweets</div>
					</a>
				))}
			</div>
		</>
	)
}
