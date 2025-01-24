'use client';

import { ChangeEvent, useState, KeyboardEvent } from "react";
import cn from 'classnames';
import PlusIcon from '~/shared/assets/icons/plus-icon.svg';
import { useDispatch } from "react-redux";
import { create } from "~/shared/store/slices/todoSlice";

export const TodoCreator: React.FC = () => {
    const [value, setValue] = useState('');
    const [isDirty, setIsDirty] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        setIsDirty(newValue.trim() !== '');
    };

    const handleCreate = () => {
        if (value.trim() !== '') {
            setValue('');
            setIsDirty(false);
            dispatch(create(value));
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleCreate();
        }
    };
    return (
        <div className={'relative flex flex-row w-full text-sm sm:text-2xl text-primary rounded-card shadow-card px-3 sm:px-5 py-5 sm:py-6 items-center'}>
            <input
                type={'text'}
                value={value}
                onChange={handleChange}
                className={cn('peer outline-none w-full')}
                onKeyDown={handleKeyDown}
            />
            <label
                className={cn(
                    'absolute text-sub transition-all top-1/2 -translate-y-1/2 pointer-events-none',
                    isDirty ? 'left-2 opacity-0' : 'left-3 sm:left-5 opacity-100'
                )}
            >
                {'Создать задачу'}
            </label>
            <button
                className={cn(
                    'items-center justify-center absolute top-1/2 -translate-y-1/2 flex border-2 border-primary rounded-btn py-0.5 sm:py-2 px-1 sm:px-3 overflow-hidden transition-all',
                    isDirty ? 'right-5 opacity-100' : 'right-2 opacity-0'
                )}
                onClick={handleCreate}
            >
                <PlusIcon className={cn('fill-primary scale-75 sm:scale-100')} />
            </button>
        </div>
    )
}