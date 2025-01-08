/**
 * Node modules
 */

import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';

const usePromptPreloader = () => {
  const navigation = useNavigation();
  const [promptPreloaderValue, setPromptPleLoaderValue] = useState('');

  useEffect(() => {

    if(navigation.formData) {
        setPromptPleLoaderValue(navigation.formData.get('user_prompt'))
    } else {
        setPromptPleLoaderValue('')
    }
  }, [navigation]);

  return {promptPreloaderValue}
};

export { usePromptPreloader };
