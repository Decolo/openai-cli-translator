#!/usr/bin/env node
const args = require("yargs").argv;
debugger;
require("../lib/cjs/index").run({
  language: args.language,
  text: args["_"][0],
  token: args.apiKey,
});
