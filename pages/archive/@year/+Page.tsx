import { useData } from 'vike-react/useData'
import { monthName } from '../../../src/format'
import type { Data } from './+data'

export default function Page() {
	const { year, months } = useData<Data>()
	return (
		<>
			<div className="breadcrumbs">
				<a href="/">Home</a> / <a href="/archive">Archive</a> / {year}
			</div>
			<h1>{year}</h1>
			<ul className="month-list">
				{months.map((m) => (
					<li key={m.month}>
						<a href={`/archive/${year}/${m.month}`}>{monthName(m.month)}</a>
						<span className="count">{m.count.toLocaleString()}</span>
					</li>
				))}
			</ul>
		</>
	)
}
