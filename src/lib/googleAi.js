/**
 * Node modules
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCFaLJQ1OXwyDV_O0rbr9_7N8YsfQ6JbWw');
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

export default model;
