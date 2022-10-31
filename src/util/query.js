exports.idsQuery = (ids, path) => {
  const filterOptions = [];
  ids.map((id) => {
    const filterOption = {};
    filterOption[path] = id;
    filterOptions.push(filterOption);
  });

  return filterOptions;
};

exports.startEndValueQuery = (startValue, endValue, searchType, path) => {
  searchType = searchType || "$eq";
  const query = {};

  if (searchType === "between") {
    if (startValue > endValue || !endValue) {
      const err = new Error();
      err.statusCode = 422;
      throw err;
    }
    query.$and = [];
    const $and_start = {};
    const $and_end = {};

    $and_start[path] = { $gte: startValue };
    $and_end[path] = { $lte: endValue };
    query.$and.push($and_start, $and_end);
  } else {
    const filterOption = {};
    filterOption[searchType] = startValue;

    query[path] = filterOption;
  }

  return query;
};
