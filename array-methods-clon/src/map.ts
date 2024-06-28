export function map<T>(array: T[], mapFunction: (element: T) => unknown) {
  let results = [];

  for (const element of array) {
    const mappedElement = mapFunction(element);
    results.push(mappedElement);
  }

  return results;
}
