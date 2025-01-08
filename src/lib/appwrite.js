/**
 * Node modules
 */

import { Client, Account, Avatars, Databases } from 'appwrite';

/**
 * Initial appwrite client
 */
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('phoenixfake');
/**
 * Initial appwrite account
 */
const account = new Account(client);

/**
 * Initial appwrite avatar
 */

const avatars = new Avatars(client);

/**
 * Initial appwrite databases
 */

const databases = new Databases(client);

export { account, avatars, databases }
