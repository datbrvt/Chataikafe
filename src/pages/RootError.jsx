/**
 * Node modules
 */

import { useRouteError, Link, useNavigation } from 'react-router-dom';

/**
 * Components
 */

import { LinearProgress } from '../components/Progress';

const RootError = () => {
  const error = useRouteError();

  const navigation = useNavigation();
  return (
    <>
      <div className='justify-items-center content-center grid grid-cols-1 h-dvh'>
        <p className='text-displayLarge'>{error.status}</p>

        <p className='mt-1 mb-4 text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant'>
          We could&apos;t find the page tou&apos;re looking for.
        </p>

        <Link
          className='btn filled primary'
          to='/'
        >
          Back to home
          <div className='state-layer'></div>
        </Link>

        {navigation.state === 'loading' && (
            <LinearProgress classes='fixed top-0 left-0 right-0  '/>
        )}
      </div>
    </>
  );
};

export default RootError;
