import { header } from 'framer-motion/client';
import React from 'react';

/**
 * Node modules
 */

import {
  useNavigation,
  useNavigate,
  useLoaderData,
  useParams,
  useSubmit
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Custom modules
 */

import logout from '../utils/logout';
/**
 * Custom hooks
 */

import { useToggle } from '../hooks/useToggle';
import deleteConversation from '../hooks/deleteConversation';
/**
 * Components
 */
import { IconBtn } from './Button';
import Avatar from './Avatar';
import Menu from './Menu';
import MenuItem from './MenuItem';
import { LinearProgress } from './Progress';
import Logo from './Logo';
/**
 * Assents
 */

const TopAppBar = ({ toggleSidebar }) => {
  const [showMenu, setShowMenu] = useToggle();

  const navigate = useNavigate();

  const { conversations, user } = useLoaderData();

  const params = useParams();

  const navigation = useNavigation();

  const submit = useSubmit();

  const isNormalLoad =
    navigation.state === 'loading' && !navigation.formData;

  return (
    <header className='relative flex justify-between items-center px-4 h-16'>
      <div className='flex items-center gap-1'>
        <IconBtn
          icon='menu'
          title='Menu'
          classes='lg:hidden'
          onClick={toggleSidebar}
        />

        <Logo classes='lg:hidden' />
      </div>

      {params.conversationId && (
        <IconBtn
          icon='delete'
          classes='ms-auto me-1 lg:hidden'
          onClick={() => {
            const { Title } = conversations.documents.find(
              ({ $id }) => params.conversationId === $id
            );

            deleteConversation({
              id: params.conversationId,
              Title,
              submit
            });
          }}
        />
      )}

      <div className='menu-wrapper'>
        <IconBtn onClick={setShowMenu}>
          <Avatar name={user.name} />
        </IconBtn>

        <Menu classes={showMenu ? 'active' : ''}>
          <MenuItem
            labelText='Log out'
            onClick={() => logout(navigate)}
          />
        </Menu>
      </div>
      <AnimatePresence>
        {isNormalLoad && (
          <LinearProgress classes='absolute top-full left-0 right-0 z-40' />
        )}
      </AnimatePresence>
    </header>
  );
};

TopAppBar.propTypes = {
  toggleSidebar: PropTypes.func
};

export default TopAppBar;
