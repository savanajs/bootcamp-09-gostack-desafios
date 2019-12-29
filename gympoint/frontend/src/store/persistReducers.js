import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import expireReducer from 'redux-persist-expire';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gympoint',
      storage,
      whitelist: ['auth', 'user'],
      transforms: [
        // Create a transformer by passing the reducer key and configuration. Values
        // shown below are the available configurations with default values
        expireReducer('preference', {
          expireSeconds: 86400 * 2,
        }),
        // You can add more `expireReducer` calls here for different reducers
        // that you may want to expire
      ],
    },
    reducers
  );

  return persistedReducer;
};
