/**
 * Node modules
 */
import { useLoaderData } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
/**
 * Custom modules
 */

import { useToggle } from '../hooks/useToggle';
/**
 * Components
 */
import Avatar from './Avatar';
import { IconBtn } from './Button';

const UserPrompt = ({ text }) => {
  const { user } = useLoaderData();

  const [isExpanded, toggleExpand] = useToggle();

  const textBoxRef = useRef();

  const [hasMoreContent, setMoreContent] = useState(false);

  useEffect(() => {
    setMoreContent(
      textBoxRef.current.scrollHeight > textBoxRef.current.clientHeight
    );
  }, [textBoxRef]);
  return (
    <div className='items-center gap-1 md:gap-5 grid grid-cols-1 md:grid-cols-[max-content,mixmax(0,1fr),max-content] py-4'>
      <Avatar name={user?.name} />

      <p
        className={`${
          !isExpanded ? 'line-clamp-4' : ''
        } pt-1 text-bodyLarge whitespace-pre-wrap`}
        ref={textBoxRef}
      >
        {text}
      </p>

      {hasMoreContent && (
        <IconBtn
          icon={isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          onClick={toggleExpand}
          title={isExpanded ? 'Collapse text' : 'Expand text'}
        />
      )}
    </div>
  );
};

UserPrompt.propTypes = {
  text: PropTypes.string.isRequired
};

export default UserPrompt;
