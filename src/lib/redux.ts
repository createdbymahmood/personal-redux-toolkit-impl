import { RootState } from "../app/store";

export function providesList<
  R extends { id: string | number }[],
  T extends string
>({ resultsWithIds, tagType }: { resultsWithIds: R | undefined; tagType: T }) {
  return resultsWithIds
    ? [
        { type: tagType, id: "LIST" },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: "LIST" }];
}

/* eslint-disable import/prefer-default-export */

export const makeSubSelector =
  <ReducerState>(rootSelector: (state: RootState) => ReducerState) =>
  <Key extends keyof ReducerState>(key: Key) =>
  (state: RootState) =>
    rootSelector(state)[key];
