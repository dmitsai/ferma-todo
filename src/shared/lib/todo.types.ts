export const status = {
    DONE: 'DONE',
    OPEN: 'OPEN',
} as const;

export type Status = (typeof status)[keyof typeof status]

export interface Todo {
    id: string,
    date: string,
    status: Status,
    content: string,
}