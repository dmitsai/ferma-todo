import { PropsOf } from "~/shared/lib/types";
import cn from "classnames";

export interface ButtonProps extends Omit<PropsOf<'button'>, 'children'> {
    label: string;
    labelClassName?: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
    const { label, labelClassName, className, ...other } = props;

    return (
        <button className={cn('group/btn flex flex-col justify-center py-1 sm:py-2 px-4 rounded-btn border-2 disabled:bg-gray disabled:border-gray transition-colors', className,)} {...other}>
            <span className={cn('group-disabled/btn:text-sub-gray text-sm sm:text-base', labelClassName)}>{label}</span>
        </button>
    )
}