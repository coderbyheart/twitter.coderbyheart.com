import { getYearIndex } from "../../../src/tweets";

export type Data = {
  years: ReturnType<typeof getYearIndex>;
};

export const data = (): Data => ({ years: getYearIndex() });
