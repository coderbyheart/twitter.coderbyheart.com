import React from "react";
import type { Tweet as TweetT } from "../src/tweets";
import { formatDate, renderMarkdown } from "../src/format";

interface Props {
  tweet: TweetT;
  showPermalink?: boolean;
}

export default function Tweet({ tweet, showPermalink = true }: Props) {
  const { id, body, data } = tweet;
  const html = renderMarkdown(body);
  return (
    <article className="tweet" id={`status-${id}`}>
      {data.in_reply_to_screen_name && data.in_reply_to_status_id_str ? (
        <div className="in-reply-to">
          Replying to{" "}
          <a
            href={
              data.in_reply_to_screen_name === "coderbyheart"
                ? `/status/${data.in_reply_to_status_id_str}`
                : `https://twitter.com/${data.in_reply_to_screen_name}/status/${data.in_reply_to_status_id_str}`
            }
            {...(data.in_reply_to_screen_name === "coderbyheart"
              ? {}
              : { rel: "nofollow noopener" })}
          >
            @{data.in_reply_to_screen_name}
          </a>
        </div>
      ) : null}
      <div className="tweet-body" dangerouslySetInnerHTML={{ __html: html }} />
      <div className="tweet-meta">
        {showPermalink ? (
          <a href={`/status/${id}`}>{formatDate(data.created_at)}</a>
        ) : (
          <span>{formatDate(data.created_at)}</span>
        )}
        {data.favorite_count ? <span>♥ {data.favorite_count}</span> : null}
        {data.retweet_count ? <span>↻ {data.retweet_count}</span> : null}
      </div>
    </article>
  );
}
