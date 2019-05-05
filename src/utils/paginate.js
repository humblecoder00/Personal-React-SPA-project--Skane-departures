import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  //  figure out the starting numbers of the items on currentPage

  const startIndex = (pageNumber - 1) * pageSize;
  //   _.slice(items, startIndex);
  //   _.take()
  // to chain lodash methods, we can wrap our array inside a lodash object:

  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
