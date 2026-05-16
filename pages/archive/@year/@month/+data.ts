import { render } from "vike/abort";
import type { PageContextServer } from "vike/types";
import { getTweetsByMonth, type Tweet } from "../../../../src/tweets";

export type Data = {
  year: string;
  month: string;
  tweets: Tweet[];
};

export const data = (pageContext: PageContextServer): Data => {
  const { year, month } = pageContext.routeParams as { year: string; month: string };
  const tweets = getTweetsByMonth(year, month);
  if (tweets.length === 0) throw render(404);
  return { year, month, tweets };
};
