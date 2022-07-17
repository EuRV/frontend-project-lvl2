import stylish from './stylish.js';
import plain from './plain.js';

const formatOutpput = (data, formatter) => {
  switch (formatter) {
    case 'plain':
      return plain(data);
    default:
      return stylish(data);
  }
};

export default formatOutpput;
