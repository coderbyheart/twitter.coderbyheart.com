import { getYearIndex } from "../../../src/tweets";

export default function onBeforePrerenderStart(): string[] {
  return getYearIndex().map((y) => `/archive/${y.year}`);
}
