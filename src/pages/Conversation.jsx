/**
 * Node modules
 */

import { motion } from 'framer-motion';
import { useLoaderData, useLocation } from 'react-router-dom';

/**
 * Custom hook
 */

import { usePromptPreloader } from '../hooks/usePromptPleloader';

/**
 * Components
 */
import PageTitle from '../components/PageTitle';
import UserPrompt from '../components/UserPrompt';
import AiResponse from '../components/AiResponse';
import PromptPreloader from '../components/PromptPreloader';

const Conversation = () => {
  const {
    conversation: { Title, chats }
  } = useLoaderData() || {};

  const { promptPreloaderValue } = usePromptPreloader();

  const location = useLocation();
  return (
    <>
      {/* Meta title */}
      <PageTitle title={`${Title} | Phoenix`} />

      <motion.div
        className='mx-auto max-w-[700px] !will-change-auto'
        initial={!location.state?._isRedirect && { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.05, ease: 'easeOut' }}
      >
        {chats.map((chat) => (
          <div key={chat.$id}>
            {/** UserPrompt */}
            <UserPrompt text={chat.user_prompt} />
            {/** AI response */}
            <AiResponse aiResponse={chat.ai_response} />
          </div>
        ))}
      </motion.div>

      {promptPreloaderValue && (
        <PromptPreloader promptValue={promptPreloaderValue} />
      )}
    </>
  );
};

export default Conversation;
