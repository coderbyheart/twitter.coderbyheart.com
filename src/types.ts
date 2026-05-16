export interface TweetFrontmatter {
	favorite_count?: number
	retweet_count?: number
	created_at: string
	lang?: string
	full_text?: string
	in_reply_to_screen_name?: string
	in_reply_to_status_id_str?: string
	replies?: string[]
	video_aspect_ratio?: number
}

export interface Tweet {
	id: string
	body: string
	data: TweetFrontmatter
	year: string
	month: string
}

export interface RenderedTweet extends Tweet {
	html: string
}
