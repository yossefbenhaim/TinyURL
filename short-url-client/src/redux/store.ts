import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { SlicesNames } from 'models/enums/slicesNames';

import storage from 'redux-persist/lib/storage';
import urlShortcutListReducer from './slice/shortenedUrlList';

const persistConfig = {
    key: 'root',
    type: storage,
    storage,
    whitelist: [SlicesNames.SHORTENED_URL_LIST],
};

const rootReducer = combineReducers({
    [SlicesNames.SHORTENED_URL_LIST]: urlShortcutListReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

const persistodStore = persistStore(store);
export type AddDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector;
export { store, persistodStore };
