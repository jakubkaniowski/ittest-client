export const checkIfExists = ({ array, item, fieldToCompare = 'id' }) => {
  const isObject = typeof item === 'object' && item !== null;
  let isExist = false;
  if (isObject) {
    isExist = array.some((arrayItem) => arrayItem[fieldToCompare] === item.id);
  } else {
    isExist = array.includes(item);
  }

  return isExist;
};

export const compare = (fieldName) => (a, b) => {
  const bandA = a[fieldName];
  const bandB = b[fieldName];

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
};
