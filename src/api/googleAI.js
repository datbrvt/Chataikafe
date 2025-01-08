/**
 * Custom modules
 */

import model from '../lib/googleAi';

const getConversationTitle = async (userPrompt) => {
  try {
    const result = await model.generateContent(`
      Given a user prompt, generate a concise and informative title that accurately describes the conversation. Consider keywords, topics, and the overall sentiment of the prompt. Response in the plain text format, not markdown.
      
      Prompt: ${userPrompt},`);
    return result.response.text();
  } catch (err) {
    console.log(`Error generating titlt ${err.message}`);
  }
};

const getAiresponse = async (userPrompt, chats = []) => {
  const history = [];
  chats.forEach(({ user_prompt, ai_response }) => {
    history.push(
      {
        role: 'user',
        parts: [{ text: user_prompt }]
      },
      {
        role: 'model',
        parts: [{ text: ai_response }]
      }
    );
  });

  try {
    model.generationConfig = {
      temperature: 1.5
    };
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(userPrompt);

    return result.response.text();
  } catch (err) {
    console.log(`Error generating AI response ${err.message}`);
  }
};

export { getConversationTitle, getAiresponse };
