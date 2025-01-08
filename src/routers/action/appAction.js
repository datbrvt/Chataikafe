/**
 * Node modules
 */
import { redirect } from 'react-router-dom';

/**
 * Custom modules
 */
import { account, databases } from '../../lib/appwrite';
import { getConversationTitle, getAiresponse } from '../../api/googleAI';
import generateID from '../../utils/generateID';

const userPromptAction = async (formData) => {
  const userPrompt = formData.get('user_prompt');
  const user = await account.get();



  const conversationTitle = await getConversationTitle(userPrompt);

  let conversation = null;

  try {
    conversation = await databases.createDocument(
      'phoenix_fake',
      'conversation',
      generateID(),
      {
        Title: conversationTitle,
        user_id: user.$id
      }
    );
  } catch (err) {
    console.log(`Error creating conversation ${err.message}`);
  }

  const aiResponse = await getAiresponse(userPrompt);
  try {
    await databases.createDocument('phoenix_fake', 'chats', generateID(), {
      user_prompt: userPrompt,
      ai_response: aiResponse,
      conversation: conversation.$id
    });
  } catch (err) {
    console.log(`Error creating chat ${err.message}`);
  }

  return redirect(`/${conversation.$id}`);
};

const conversationAction = async (formData) => {
  const conversationId = formData.get('conversation_id')
  const conversationTitle = formData.get('conversation_title')

  try {
    await databases.deleteDocument(
      'phoenix_fake',
      'conversation',
      conversationId
    );

    return (conversationTitle)
  } catch (err) {
    console.log(`Error in deleting conversation: ${err.message}`)
  }
}

const appAction = async ({ request }) => {
  const formData = await request.formData();
  const requestType = formData.get('request_type');
  if (requestType === 'user_prompt') {
    return await userPromptAction(formData);
  }

  if (requestType === 'delete_conversation') {
    return await conversationAction(formData);

  }
};

export default appAction;
