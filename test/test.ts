import { run } from '../src/index';

run({
  language: 'zh',
  text: 'hello world',
  token: process.env.OPENAI_API_KEY
})