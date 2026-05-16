import { useEffect, useState } from 'react'

export default function Lightbox() {
	const [src, setSrc] = useState<string | null>(null)
	const [alt, setAlt] = useState<string>('')

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement | null
			if (!target) return
			const img = target.closest?.('img.tweet-media') as HTMLImageElement | null
			if (!img) return
			e.preventDefault()
			setSrc(img.currentSrc || img.src)
			setAlt(img.alt || '')
		}
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setSrc(null)
		}
		document.addEventListener('click', onClick)
		document.addEventListener('keydown', onKey)
		return () => {
			document.removeEventListener('click', onClick)
			document.removeEventListener('keydown', onKey)
		}
	}, [])

	useEffect(() => {
		document.body.style.overflow = src ? 'hidden' : ''
		return () => {
			document.body.style.overflow = ''
		}
	}, [src])

	if (!src) return null
	return (
		<div
			className="lightbox"
			role="dialog"
			aria-modal="true"
			aria-label="Image viewer"
			onClick={() => setSrc(null)}
		>
			<img src={src} alt={alt} />
			<button
				type="button"
				className="lightbox-close"
				aria-label="Close"
				onClick={(e) => {
					e.stopPropagation()
					setSrc(null)
				}}
			>
				×
			</button>
		</div>
	)
}
