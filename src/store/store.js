import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { authLog } from '../api/authApi';

const store = configureStore({
  reducer: {
    [authLog.reducerPath]: authLog.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authLog.middleware),
});

setupListeners(store.dispatch);

export default store;
