import React from 'react';
/**
 * Node modules
 */
import PropTypes from 'prop-types';
import { NavLink, useLoaderData, useSubmit, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 *  Custom modules
 */

import deleteConversation from '../hooks/deleteConversation';

/**
 * Components
 */
import Logo from './Logo';
import { ExtendedFab } from './Button';
import { IconBtn } from './Button';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {

  const submit = useSubmit()

  const {conversationId} = useParams()

  const {
    conversations: { documents: conversationData }
  } = useLoaderData() || {};

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`sidebar ${isSidebarOpen ? 'active' : ''}`}
      >
        <div className='sidebar-inner'>
          <div className='items-center grid mb-4 px-4 h-16'>
            {/* logo */}
            <Logo />
          </div>
          <ExtendedFab
            href='/'
            text='New chat'
            classes=''
            onClick={toggleSidebar}
            disabled={!conversationId}
          />

          <div className='overflow-y-auto -me-2 pe-1'>
            <p className='items-center grid px-4 h-9 text-titleSmall'>Recent</p>
            <nav>
              {conversationData.map((item) => (
                <div
                  key={item.$id}
                  className='relative group'
                >
                  <NavLink
                    to={item.$id}
                    className='nav-link'
                    title={item.Title}
                    onClick={toggleSidebar}
                  >
                    <span className='material-symbols-rounded icon-small'>
                      chat_bubble
                    </span>

                    <span className='truncate'>{item.Title}</span>

                    <div className='state-layer'></div>
                  </NavLink>

                  <IconBtn
                    icon='delete'
                    size='small'
                    classes='absolute top-1/2 right-1.5 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 group:focus-within:opaci  ty-100 lg:grid'
                    title='Delete'
                    onClick={()=>{
                      deleteConversation({
                        id:item.$id,
                        title:item.Title,
                        submit
                      })
                    }}

                  ></IconBtn>
                </div>
              ))}
            </nav>
          </div>

          <div className='items-center dark:border-dark-surfaceContainerHigh grid mt-4 px-4 border-t border-light-surfaceContainerHigh h-14 text-labelLarge text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant truncate'>
            &copy; 2024 NTDPROG
          </div>
        </div>
      </motion.div>

      <div
        className={`overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
      ></div>
    </>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func
};

export default Sidebar;
