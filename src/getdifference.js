import has from 'lodash/has';
import isObject from 'lodash/isObject';

const getDifference = (data1, data2) => {
  const data = { ...data1, ...data2 };
  const dataKeys = Object.keys(data).sort();
  return dataKeys.reduce((acc, key) => {
    if (!(key in data1)) {
      acc[key] = { key, type: 'added', value: data2[key] };
    } else if (!(key in data2)) {
      acc[key] = { key, type: 'removed', value: data1[key] };
    } else if (isObject(data1[key]) && isObject(data2[key])) {
      acc[key] = { key, type: 'nested', children: getDifference(data1[key], data2[key]) };
    } else if (data1[key] === data2[key]) {
      acc[key] = { key, type: 'unchanged', value: data1[key] };
    } else if ((has(data1, key) && has(data2, key)) && data1[key] !== data2[key]) {
      acc[key] = {
        key, type: 'changed', previosValue: data1[key], nextValue: data2[key],
      };
    }
    return acc;
  }, {});
};

export default getDifference;
