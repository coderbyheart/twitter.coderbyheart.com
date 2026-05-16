const MONTH_NAMES = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

export function monthName(month: string): string {
	const idx = parseInt(month, 10) - 1
	return MONTH_NAMES[idx] ?? month
}

export function formatDate(iso: string): string {
	const d = new Date(iso)
	return d.toUTCString().replace(' GMT', ' UTC')
}
