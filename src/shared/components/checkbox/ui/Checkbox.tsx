'use client';

import { PropsOf } from "~/shared/lib/types";
import cn from 'classnames';

export interface CheckboxProps extends Omit<PropsOf<'label'>, 'children'> {
    isChecked: boolean,
    label: string,
    labelClassName?: string,
    inputClassName?: string,
}

export const Checkbox: React.FC<CheckboxProps> = (props) => {
    const { label, isChecked, labelClassName, inputClassName, className, ...other } = props
    return (
        <label className={cn('flex flex-row gap-x-8 items-start justify-center', className)}  {...other}>
            <input
                type={'checkbox'}
                className={cn(
                    'appearance-none w-5 h-5 rounded-full border-2 border-sub',
                    'checked:bg-green checked:border-green hover:bg-extra-gray hover:border-sub',
                    inputClassName,
                )}
                checked={isChecked}
                onChange={() => { }}
            />
            <span className={cn('text-primary text-sm sm:text-base', labelClassName)}>{label}</span>
        </label >
    )
} 