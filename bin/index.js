#!/usr/bin/env node
const { program } = require('commander');

program
  .option('-l, --language <char>', 'which target language translate to', 'en')
  .option('-k, --key <char>', 'provide openai apikey');

program.parse();

const options = program.opts();

require('../lib/cjs/index.js').run({
  language: options.language,
  token: options.key,
  text: program.args[0]
})