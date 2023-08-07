import { OpenAIApi, Configuration } from "openai";
import fs from "fs";
import path from "path";
import ora from "ora";
import chalk from "chalk";
import 'dotenv/config';

const getPathRelativeToProject = (_path: string) => {
  return path.resolve(__dirname, _path);
}

export const run = async ({
  text,
  language = "en",
  token
}: {
  text: string,
  language?: string
  token?: string
}) => {
  if (!token) {
    if (fs.existsSync(getPathRelativeToProject("./cache.json"))) {
      // @ts-ignore
      const { _token } = await import(getPathRelativeToProject("./cache.json"));
      token = _token;
    }
  } else {
    fs.writeFileSync(getPathRelativeToProject("./cache.json"), JSON.stringify({ _token: token }));
  }
  if (!token) {
    console.log(
      chalk.red(
        "You need to provide a token, you can get one from https://beta.openai.com/account/api-keys"
      )
    );
    return;
  }

  const configuration = new Configuration({
    apiKey: token,
  });

  const openai = new OpenAIApi(configuration);

  const spinner = ora().start();
  try {
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `translate to ${language}: ${text}` },
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

