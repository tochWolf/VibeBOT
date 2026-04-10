import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getGeneralResponse = async ({ messages }) => {
  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages,
    temperature: 0.7
  });

  return completion.choices[0]?.message?.content || 'I could not generate a response right now.';
};

export const getEmbeddingsClient = () => client;
