import { loadAllTweets } from "../../../src/tweets";

export default function onBeforePrerenderStart(): string[] {
  return [...loadAllTweets().keys()].map((id) => `/status/${id}`);
}
