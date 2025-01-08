/**
 * Custom modules
 */

import { databases } from '../../lib/appwrite';
import { getAiresponse } from '../../api/googleAI';
import generateID from '../../utils/generateID';

const conversationAction = async ({ request, params }) => {
  const { conversationId } = params;
  const formData = await request.formData();
  const userPrompt = formData.get('user_prompt');

  let chatHistory = [];
  let aiResponse = '';

  try {
    const { chats } = await databases.getDocument(
      'phoenix_fake',
      'conversation',
      conversationId
    );
    chatHistory = chats.map(({ user_prompt, ai_response }) => {
      return { user_prompt, ai_response };
    });
  } catch (err) {
    console.error(`Error getting chat ${err.message}`);
  }

  try {
    aiResponse = await getAiresponse(userPrompt, chatHistory);
  } catch (err) {
    console.log(`Error getting Gemini response: ${err.message}`);
  }

  try {
    await databases.createDocument('phoenix_fake', 'chats', generateID(), {
      user_prompt: userPrompt,
      ai_response: aiResponse,
      conversation: conversationId
    });
  } catch (err) {
    console.error(`Error saving chat ${err.message}`);
  }

  return null;
};

export default conversationAction;
