export const findInData = (data, id) => {
  return data.find(record => record.id.toString() === id.toString());
}

export const arrayContainsOrEqualArray = (superset, subset) => {
  if (superset.length === 0 && subset.length === 0) return true;
  if (superset.length !== 0 && subset.length === 0) return true;
  return subset.every(value => (superset.indexOf(value) >= 0));
}
