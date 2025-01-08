/**
 * Node modules
 */
import { redirect } from 'react-router-dom';
/**
 * Custom hook
 */
import { account, databases } from '../../lib/appwrite';

const conversationLoader = async ({ params }) => {
  const { conversationId } = params;
  const data = {};

  try {
    data.user = await account.get();
  } catch (err) {
    console.error(`Error getting user account: ${err.message}`);
    return redirect('/login');
  }
  try {
    data.conversation = await databases.getDocument(
      'phoenix_fake',
      'conversation',
      conversationId
    );
  } catch (err) {
    console.error(`Error getting conversation: ${err.message}`);
    throw err;
  }

  return data;
};

export default conversationLoader;
