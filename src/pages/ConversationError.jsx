/**
 * Node modules
 */
import { useRouteError, Link } from 'react-router-dom';

const ConversationError = () => {
  const error = useRouteError();

  return (
    <div className='justify-items-center content-center grid grid-cols-1 h-full'>
      <p className='font-semibold text-displayMedium'>{error.code}</p>

      <p className='mt-2 mb-4 text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant'>
        {error.message}
      </p>

      <Link
        className='btn filled primary'
        to='/'
      >
        Create new chat
        <div className='state-layer'></div>
      </Link>
    </div>
  );
};

export default ConversationError;
