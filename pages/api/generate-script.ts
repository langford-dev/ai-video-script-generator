import type { NextApiRequest, NextApiResponse } from 'next'
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `produce video script this description: ${req.body.video_description}`,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  res.status(200).send(response.data.choices[0].text)
}
