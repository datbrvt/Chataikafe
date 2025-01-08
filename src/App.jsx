/**
 * Node modules
 */

import { motion } from 'framer-motion';
import {
  Outlet,
  useNavigation,
  useParams,
  useActionData, 
} from 'react-router-dom';
import { useEffect, useRef } from 'react';


/**
 * Components
 */

import PageTitle from './components/PageTitle';
import TopAppBar from './components/TopAppBar';
import Sidebar from './components/Sidebar';
import Greeting from './pages/Greeting';
import PromptField from './components/PromptField';

/**
 * Custom hooks
 */

import { useToggle } from './hooks/useToggle';
import { useSnackbar } from './hooks/useSnackbar';
import { usePromptPreloader } from './hooks/usePromptPleloader';


const App = () => {
  const params = useParams();

  const navigation = useNavigation();


  const actionData = useActionData();

  const chatHistoryRef = useRef()
  

  const [isSidebarOpen, toggleSidebar] = useToggle();

  const {promptPreloaderValue} = usePromptPreloader() 

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (actionData?.conversationTitle) {
      showSnackbar({
        message: `Deleted '${actionData.conversationTitle}' conversation.`
      });
    }
  }, [actionData, showSnackbar]);

  useEffect(()=>{
    const chatHistory = chatHistoryRef.current;
    if(promptPreloaderValue) {
      chatHistory.scroll(
        {
          top:chatHistory.scrollHeight - chatHistory.clientHeight,
          behavior: 'smooth',
        }
      )
    }

  },[chatHistoryRef, promptPreloaderValue])

  const isNormalLoad = navigation.state === 'loading' && !navigation.formData;
  return (
    <>
      {/* Meta title */}

      <PageTitle title='Phoenix - chat to supercharge your ideas' />

      <div className='lg:grid lg:grid-cols-[320px,1fr]'>
        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        <div className='grid grid-rows-[max-content,minmax(0,1fr),max-content] h-dvh'>
          {/* Top app bar */}
          <TopAppBar toggleSidebar={toggleSidebar} />
          {/* Main content */}
          <div ref={chatHistoryRef} className='flex flex-col px-5 pb-5 overflow-y-auto'>
            <div className='mx-auto w-full max-w-[840px] grow'>
              {isNormalLoad ? null : params.conversationId ? (
                <Outlet /> //Conversation
              ) : (
                <Greeting />
              )}
            </div>
          </div>

          {/* Promt filed */}
          <div className='bg-light-background dark:bg-dark-background'>
            <div className='mx-auto px-5 w-full max-w-[870px]'>
              <PromptField />
              <motion.p
                initial={{ opacity: 0, translateY: '-4px' }}
                animate={{ opacity: 1, translateY: '0px' }}
                transition={{ duration: 0.2, delay: 0.8, ease: 'easeOut' }}
                className='p-3 text-bodySmall text-center text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant'
              >
                Phoenix may display inaccurate info, including about people, so
                double check its responses.
                <a
                  href='https://support.google.com/gemini?p=privacy_notice'
                  className='inline underline ms-1'
                  target=''
                >
                  Your privacy & Gemini Apps
                </a>
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
