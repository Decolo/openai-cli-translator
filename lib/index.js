const { Configuration, OpenAIApi } = require("openai");
const ora = require("ora");
const chalk = require("chalk");

require("dotenv").config();

const argv = require("yargs/yargs")(process.argv.slice(2)).argv;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const run = async () => {
  const spinner = require("ora")().start();
  try {
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `translate to ${argv.l}: ${argv._}` },
      ],
    });

    if (
      chatCompletion &&
      chatCompletion.data &&
      Array.isArray(chatCompletion.data.choices)
    ) {
      console.log(
        chalk.green(
          chatCompletion.data.choices[0] &&
            chatCompletion.data.choices[0].message &&
            chatCompletion.data.choices[0].message.content
        )
      );
    } else {
      throw "response error, try again later";
    }
  } catch (error) {
    console.log(chalk.red(error));
  } finally {
    spinner.stop().clear();
  }
};

module.exports = {
  run,
};
