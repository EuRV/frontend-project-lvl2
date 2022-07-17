#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/gendiff.js';

const program = new Command();

program
  .version('1.0.0', '-v, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, opts) => {
    console.log(genDiff(filepath1, filepath2, opts.format));
  });

program.parse(process.argv);
