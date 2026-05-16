import { getMostLiked, getYearIndex, type Tweet } from "../../src/tweets";

export type Data = {
  topLiked: Tweet[];
  totalTweets: number;
  years: ReturnType<typeof getYearIndex>;
};

export const data = (): Data => {
  const years = getYearIndex();
  return {
    topLiked: getMostLiked(50),
    totalTweets: years.reduce((s, y) => s + y.count, 0),
    years,
  };
};
