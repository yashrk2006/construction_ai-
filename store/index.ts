import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tasksReducer from './tasksSlice';
import safetyReducer from './safetySlice';
import reportsReducer from './reportsSlice';

// Combine all reducers
const rootReducer = combineReducers({
    tasks: tasksReducer,
    safety: safetyReducer,
    reports: reportsReducer,
});

// Redux Persist configuration
const persistConfig = {
    key: 'buildsmart-india',
    version: 1,
    storage,
    // Optional: whitelist specific reducers to persist
    whitelist: ['tasks', 'safety', 'reports'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
