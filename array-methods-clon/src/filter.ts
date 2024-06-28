export function filter<T>(array: T[], filterFunction: (element: T) => boolean) {
  let results = [];

  for (const element of array) {
    if (filterFunction(element)) {
      results.push(element);
    }
  }

  return results;
}
