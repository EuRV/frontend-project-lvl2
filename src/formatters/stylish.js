const getLine = (value, count) => {
// console.log(value);
  if (typeof value !== 'object' || value === null) {
    return value;
  }
  const lines = Object.entries(value)
    .map(([key, val]) => `${' '.repeat(count)}${key}: ${getLine(val, count)}`);
  return `{\n${lines.join('\n')}\n${' '.repeat(count)}}`;
};

const stringify = {
  added: (node, depth) => `\n${' '.repeat(depth)}+ ${node.key}: ${getLine(node.value, depth)}`,
  removed: (node, depth) => `\n${' '.repeat(depth)}- ${node.key}: ${getLine(node.value, depth)}`,
  unchanged: (node, depth) => `\n${' '.repeat(depth)}  ${node.key}: ${getLine(node.value, depth)}`,
  changed: (node, depth) => `\n${' '.repeat(depth)}+ ${node.key}: ${getLine(node.previousValue, depth)}\n${' '.repeat(depth)}- ${node.key}: ${getLine(node.nextValue, depth)}`,
  nested: (node, depth) => `\n${' '.repeat(depth)}  ${node.key}: ${stringify(node.children, depth)}`,
};

const stylish = (diff) => {
  const iter = (node, depth) => stringify[node.type](node, depth, iter);
  return iter(diff, 0);
};

export default stylish;
