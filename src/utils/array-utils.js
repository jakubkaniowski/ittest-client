export const checkIfExists = ({ array, item }) => {
  const isObject = typeof item === 'object' && item !== null;
  let isExist = false;
  if (isObject) {
    isExist = array.some((arrayItem) => arrayItem.id === item.id);
  } else {
    isExist = array.includes(item);
  }

  return isExist;
};
