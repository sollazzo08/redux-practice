import { configureStore } from '@reduxjs/toolkit';
import reducer from './bugs';

export default function () {
  // Configure Store function from redux tool kit allows us to sync to redux dev tools and can dispatch async actions
  const store = configureStore({
    reducer,
  });
  return store;
}
