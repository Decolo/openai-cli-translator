#!/usr/bin/env node
const { program } = require('commander');

program
  .option('-l, --language <char>')
  .option('-k, --key <char>');

program.parse();

const options = program.opts();

require('../lib/cjs/index.js').run({
  language: options.language,
  token: options.key,
  text: program.args[0]
})