/**
 * Node modules
 */

import { createBrowserRouter } from 'react-router-dom';

/**
 * Components
 */

import App from '../App.jsx';
import Register from '../pages/register.jsx';
import Login from '../pages/Login.jsx';
import ResetLink from '../pages/ResetLink.jsx';
import ResetPassword from '../pages/ResetPassword.jsx';
import Conversation from '../pages/Conversation.jsx';
import ConversationError from '../pages/ConversationError.jsx';
import RootError from '../pages/RootError.jsx';

/**
 * Loader
 */

import registerLoader from './loaders/registerloader.js';
import loginLoader from './loaders/loginLoader.js';
import resetLinkLoader from './loaders/resetLinkLoader.js';
import resetPasswordLoader from './loaders/resetPasswordLoader.js';
import appLoader from './loaders/appLoader.js';
import conversationLoader from './loaders/conversationLoader.js';

/**
 * Actions
 */

import registerAction from './action/registerAction.js';
import loginAction from './action/loginAction.js';
import resetLinkAction from './action/resetAction.js';
import resetPasswordAction from './action/resetPassword.js';
import appAction from './action/appAction.js';
import conversationAction from './action/conversationAction.js';
/**
 * Router
 */

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: appLoader,
    action: appAction,
    errorElement: <RootError/>,
    children: [
      {
        path: '/:conversationId',
        element: <Conversation />,
        loader: conversationLoader,
        action: conversationAction,
        errorElement: <ConversationError />
      }
    ]
  },
  {
    path: '/register',
    element: <Register />,
    loader: registerLoader,
    action: registerAction
  },
  {
    path: '/login',
    element: <Login />,
    loader: loginLoader,
    action: loginAction
  },
  {
    path: '/reset-link',
    element: <ResetLink />,
    loader: resetLinkLoader,
    action: resetLinkAction
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
    loader: resetPasswordLoader,
    action: resetPasswordAction
  }
]);

export default router;