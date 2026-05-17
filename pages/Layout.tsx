import React from 'react'
import Lightbox from './Lightbox'
import './global.css'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="site">
			<header className="site-header">
				<a href="/" className="site-title">
					@coderbyheart on Twitter
				</a>
				<p className="site-tagline">
					A static archive of{' '}
					<a href="https://coderbyheart.com" rel="me">
						Markus Tacker
					</a>
					's tweets. Follow me on Mastodon:{' '}
					<a href="https://chaos.social/@coderbyheart" rel="me">
						@coderbyheart@chaos.social
					</a>
					.
				</p>
			</header>
			<main className="site-main">{children}</main>
			<Lightbox />
		</div>
	)
}
