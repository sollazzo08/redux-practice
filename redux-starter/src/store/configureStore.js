import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
import logger from './middleware/logger';
import toast from './middleware/toast';
import api from './middleware/api';

export default function () {
  // Configure Store function from redux tool kit allows us to sync to redux dev tools and can dispatch async actions
  const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), logger({destination: 'console'}), toast, api],
  });
  return store;
}
