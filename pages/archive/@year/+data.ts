import { render } from "vike/abort";
import type { PageContextServer } from "vike/types";
import { getYearIndex } from "../../../src/tweets";

export type Data = {
  year: string;
  months: { month: string; count: number }[];
};

export const data = (pageContext: PageContextServer): Data => {
  const year = pageContext.routeParams!.year;
  const idx = getYearIndex().find((y) => y.year === year);
  if (!idx) throw render(404);
  return { year, months: idx.months };
};
