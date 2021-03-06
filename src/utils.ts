export const unique = <T>(arr: T[]): T[] =>
  arr.reduce((acc, el) => (acc.includes(el) ? acc : [...acc, el]), [] as T[]);
