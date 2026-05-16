import React from "react";
import { useData } from "vike-react/useData";
import Tweet from "../Tweet";
import type { Data } from "./+data";

export default function Page() {
  const { topLiked, totalTweets, years } = useData<Data>();
  return (
    <>
      <p>
        In October 2022{" "}
        <a href="http://coderbyheart.com/leaving-twitter">I left Twitter</a>.
        This is my entire tweet archive (excluding retweets).
      </p>
      <h1>50 most liked tweets</h1>
      <p>
        From <a href="/archive">{totalTweets.toLocaleString()} tweets</a> across{" "}
        {years.length} years.
      </p>
      {topLiked.map((t) => (
        <Tweet key={t.id} tweet={t} />
      ))}
    </>
  );
}
