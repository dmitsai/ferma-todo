'use client';

import { status, Todo } from "~/shared/lib/todo.types"
import { formatDate } from "../model/utils";
import EditIcon from '~/shared/assets/icons/edit-icon.svg';
import RemoveIcon from '~/shared/assets/icons/remove-icon.svg';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { update, updateStatus, remove } from '~/shared/store/slices/todoSlice';

export interface TodoCardProps {
    todo: Todo
}

export const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
    const { id, date, status: todoStatus, content } = todo;
    const formatedDate = formatDate(date);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(content);
    const [tempValue, setTempValue] = useState(content);
    const cardRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    const handleTextClick = () => {
        if (!isEditing) {
            dispatch(updateStatus({ id, status: todoStatus === status.OPEN ? status.DONE : status.OPEN }))
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTempValue(value);
        setValue(e.target.value);
    };

    const handleSave = () => {
        console.log(value);
        if (value.trim() === '') {
            setValue(tempValue);
            dispatch(update({ id: id, content: tempValue }));
        } else {
            dispatch(update({ id: id, content: value }));
        }
        setIsEditing(false);
    };

    const handleRemove = () => {
        dispatch(remove(id));
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
            if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
                if (value.trim() === '') {
                    setValue(tempValue)
                }
                handleSave();
            }

            setIsEditing(false);
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    return (
        <div className={'flex flex-col gap-y-5 p-5 rounded-card shadow-card w-full'} ref={cardRef}>
            <span className={'font-bold text-xl'}>{formatedDate}</span>
            <div className={'flex flex-col items-start'}>
                <div className={'flex flex-row gap-x-8 items-start justify-start w-full cursor-pointer'}>
                    <div className="w-fit">
                        <input
                            id={id}
                            type={'checkbox'}
                            className={cn(
                                'peer/checkbox transition-colors appearance-none w-5 h-5 rounded-full border-2 border-sub',
                                'checked:bg-green checked:border-green hover:bg-extra-gray hover:border-sub  hover:checked:border-green hover:checked:bg-sub-green'
                            )}
                            checked={status.DONE === todoStatus}
                            onChange={handleTextClick}
                        />
                    </div>
                    {
                        isEditing ?
                            <input
                                type="text"
                                className={'text-primary text-sm sm:text-base break-all w-full focus:outline-none decoration-primary  underline underline-offset-4 caret-blue'}
                                value={value}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                ref={inputRef}
                            />
                            :
                            <label htmlFor={id} className={'peer-checked/checkbox:line-through text-primary text-sm sm:text-base break-all cursor-pointer w-full'} onDoubleClick={handleEdit}>
                                {value}
                            </label>

                    }

                </div>
                <div className={'flex flex-row justify-end gap-x-3 w-full'}>
                    <button className={'cursor-pointer flex flex-row gap-x-3  w-fit'} onClick={isEditing ? handleSave : handleEdit}>
                        {<div className={cn('flex text-blue transition-all justify-end overflow-hidden ', isEditing ? 'w-20' : 'w-0')}>{'Сохранить'}</div>}
                        <EditIcon className={cn(' w-6 h-6 transition-colors hover:stroke-sub-blue', isEditing ? 'stroke-blue' : 'stroke-primary')} />
                    </button>
                    <RemoveIcon className={'cursor-pointer w-6 h-6 transition-colors fill-red hover:fill-sub-red'} onClick={handleRemove} />
                </div>
            </div>
        </div>
    )
}