'use client';

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, tabsValues as tabs, TabsValues } from "~/features/tabs"
import { TodoCard } from "~/features/todoCard";
import { Todo } from "~/shared/lib/todo.types";
import { selectAll, selectCompleted, selectOpened } from "~/shared/store/slices/todoSlice";

export const TodoList: React.FC = () => {
    const [selected, setSelected] = useState<TabsValues>(tabs.all);

    const reverseRender = (todos: Array<Todo>): React.ReactNode[] => {
        if (!Array.isArray(todos)) return [];
        return todos.reduceRight((acc, todo) => {
            acc.push(<TodoCard key={todo.id} todo={todo} />);
            return acc;
        }, [] as React.ReactNode[])
    };

    const todos = useSelector(selectAll);
    const renderTodos = useMemo(() => reverseRender(todos), [todos]);

    const completedTodos = useSelector(selectCompleted);
    const renderCompletedTodos = useMemo(() => reverseRender(completedTodos), [completedTodos]);

    const openedTodos = useSelector(selectOpened);
    const renderOpenedTodos = useMemo(() => reverseRender(openedTodos), [openedTodos]);


    return (
        <div className={'flex flex-col gap-y-8 w-full items-start'}>
            <Tabs selected={selected} setSelected={setSelected} />
            <div className={'flex flex-col gap-y-5 w-full'}>
                {selected === tabs.all &&
                    renderTodos
                }
                {selected === tabs.done && (
                    renderCompletedTodos
                )
                }
                {selected === tabs.open && (renderOpenedTodos)}

            </div>
        </div>
    )
}