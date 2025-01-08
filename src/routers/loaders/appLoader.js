/**
 * Node modules
 */

import { redirect } from 'react-router-dom';

/**
 * Custom modules
 */

import { account, databases } from '../../lib/appwrite';
import { Query } from 'appwrite';

const appLoader = async () => {
  const data = {};
  try {
    data.user = await account.get();
  } catch (err) {
    console.log(`Error getting user session ${err.message}`);

    return redirect('/login');
  }

  try {
    data.conversations = await databases.listDocuments(
      'phoenix_fake',
      'conversation',[
        Query.select(['$id', 'Title']),
        Query.orderDesc('$createdAt'),
        Query.equal('user_id', data.user.$id)
      ]
    );
  } catch (err) {
    console.log(`Error getting conversation ${err.message}`);

    return redirect('/login');
  }
  return data;
};

export default appLoader;
