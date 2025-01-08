/**
 * Node modules
 */
import PropTypes from 'prop-types';
import { useLoaderData } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Custom hooks
 */

import { usePromptPreloader } from '../hooks/usePromptPleloader';

/**
 * Components
 */

import PromptPreloader from '../components/PromptPreloader';

const Greeting = () => {
  const { user } = useLoaderData();

  const { promptPreloaderValue } = usePromptPreloader();

  return (
    <>
      {promptPreloaderValue ? (
        <PromptPreloader promptValue={promptPreloaderValue} />
      ) : (
        <div className='place-content-center grid h-full'>
          <h2 className='font-semibold text-center text-headlineLarge text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant tracking-tight'>
            <motion.span
              initial={{ backgroundPositionX: '100%' }}
              animate={{ backgroundPositionX: '0%' }}
              transition={{ duration: 4, ease: [0.05, 0.7, 0.1, 1] }}
              className='bg-[100%_0] bg-clip-text bg-[length:350%_100%] bg-gradient-to-r from-0% from-teal-400 via-56% via-cyan-500 to-75% to-transparent text-transparent'
            >
              Hello, {user.name.split(' ')}
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className='dark:font-medium'
            >
              How can i help
            </motion.span>
          </h2>
        </div>
      )}
    </>
  );
};

export default Greeting;
