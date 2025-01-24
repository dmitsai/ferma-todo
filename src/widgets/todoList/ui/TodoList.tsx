'use client';

import { useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, tabsValues as tabs, TabsValues } from "~/features/tabs"
import { TodoCard } from "~/features/todoCard";
import { selectAll, selectCompleted, selectOpened } from "~/shared/store/slices/todoSlice";

export const TodoList: React.FC = () => {
    const [selected, setSelected] = useState<TabsValues>(tabs.all);

    const todos = useSelector(selectAll);
    const completedTodos = useSelector(selectCompleted);
    const openedTodos = useSelector(selectOpened);

    return (
        <div className={'flex flex-col gap-y-8 w-full items-start'}>
            <Tabs selected={selected} setSelected={setSelected} />
            <div className={'flex flex-col gap-y-5 w-full'}>
                {selected === tabs.all && (todos.map(todo => (<TodoCard key={todo.id} todo={todo} />)))}
                {selected === tabs.done && (completedTodos.map(todo => (<TodoCard key={todo.id} todo={todo} />)))}
                {selected === tabs.open && (openedTodos.map(todo => (<TodoCard key={todo.id} todo={todo} />)))}

            </div>
        </div>
    )
}