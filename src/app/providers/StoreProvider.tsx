'use client';

import debounce from 'debounce';
import { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { getLocalState, setLocalState } from '~/shared/lib/localStorage';
import { TODOS_KEY } from '~/shared/lib/todo.types';
import { makeStore, AppStore, RootState } from '~/shared/store';
import { init } from '~/shared/store/slices/todoSlice';


const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const storeRef = useRef<AppStore | undefined>(undefined);
    const isClient = useRef(false);

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    useEffect(() => {
        isClient.current = true;
        const preloadedState = getLocalState<RootState>(TODOS_KEY);
        if (preloadedState?.todos) {
            storeRef.current?.dispatch(init(preloadedState.todos.data));
        }
    }, [storeRef]);

    const debouncedSaveState = debounce(() => {
        if (storeRef.current) {
            const state = storeRef.current.getState();
            setLocalState<RootState>(state, TODOS_KEY);
        }
    }, 1000);

    useEffect(() => {
        if (storeRef.current) {
            const unsubscribe = storeRef.current.subscribe(debouncedSaveState);
            return () => {
                unsubscribe();
            };
        }
        return () => { };
    }, [storeRef, debouncedSaveState]);

    return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
