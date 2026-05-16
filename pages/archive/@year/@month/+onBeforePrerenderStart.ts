import { getYearIndex } from "../../../../src/tweets";

export default function onBeforePrerenderStart(): string[] {
  const urls: string[] = [];
  for (const y of getYearIndex()) {
    for (const m of y.months) {
      urls.push(`/archive/${y.year}/${m.month}`);
    }
  }
  return urls;
}
