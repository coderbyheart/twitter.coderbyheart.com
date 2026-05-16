import React from "react";
import { useData } from "vike-react/useData";
import Tweet from "../../Tweet";
import type { Data } from "./+data";

export default function Page() {
  const { tweet, replies } = useData<Data>();
  return (
    <>
      <div className="breadcrumbs">
        <a href="/">Home</a> / <a href="/archive">Archive</a> /{" "}
        <a href={`/archive/${tweet.year}`}>{tweet.year}</a> /{" "}
        <a href={`/archive/${tweet.year}/${tweet.month}`}>
          {tweet.year}-{tweet.month}
        </a>{" "}
        / {tweet.id}
      </div>
      <Tweet tweet={tweet} showPermalink={false} />
      {replies.length > 0 ? (
        <div className="replies">
          <h2>
            {replies.length} {replies.length === 1 ? "reply" : "replies"}
          </h2>
          {replies.map((r) => (
            <Tweet key={r.id} tweet={r} />
          ))}
        </div>
      ) : null}
    </>
  );
}
