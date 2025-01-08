/**
 * Node modules
 */

import { createContext, useRef, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Components
 */
import Snackbar from '../components/Snackbar';

const initialCtxValue = {
  snackbar: {
    open: false,
    message: '',
    type: 'info'
  },
  showSnackbar: ({ message, type = 'info', timeOut = 5000 }) => {},
  hideSnackbar: () => {}
};

export const SnackbarContext = createContext(initialCtxValue);

const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: 'info'
  });

  const timeOutRef = useRef();

  const showSnackbar = useCallback(
    ({ message, type = 'info', timeOut = 5000 }) => {
      if (timeOutRef.current) clearTimeout(timeOutRef.current);

      setSnackbar({ open: true, message, type });

      timeOutRef.current = setTimeout(() => {
        setSnackbar((prev) => {
          return { ...prev, open: false };
        });
      }, timeOut);
    },
    []
  );

  const hideSnackbar = useCallback(() => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
    setSnackbar({ open: false, message: '', type: 'info' });
  }, []);

  const contextValue = {
    showSnackbar,
    hideSnackbar,
    snackbar // Thêm snackbar vào context để các component con có thể sử dụng
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar snackbar={snackbar} /> {/* Hiển thị snackbar */}
    </SnackbarContext.Provider>
  );
};

SnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired // Dùng PropTypes.node cho children
};

export default SnackbarProvider;
