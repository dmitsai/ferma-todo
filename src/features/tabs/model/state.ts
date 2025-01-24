export const tabsValues = {
    all: 'Все',
    done: 'Выполнено',
    open: 'Не выполнено',
} as const;

export type TabsValues = (typeof tabsValues)[keyof typeof tabsValues];