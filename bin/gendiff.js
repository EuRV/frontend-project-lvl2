#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .version('1.0.0', '-v, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1> <filepath2>')

  program.parse();
  