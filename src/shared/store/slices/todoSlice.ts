import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status, Todo,status } from "~/shared/lib/todo.types";
import { v4 as uuidv4 } from 'uuid';
import { RootState } from "..";

interface TodoState {
    data: Array<Todo>
}
const initialState:TodoState = {
    data: [
        {
            id: '001',
            date: new Date().toDateString(),
            status: status.DONE,
            content: "Завершить проект по настройке Vite для темы WordPress."
        },
        {
            id: '002',
            date: new Date('2025-01-22').toDateString(),
            status: status.OPEN,
            content: "Завершить написание SEO-текста с учетом всех требований."
        },
        {
            id: '003',
            date: new Date('2025-01-21').toDateString(),
            status: status.OPEN,
            content: "Продолжить работу над кубиком Рубика в Three.js"
        },
        {
            id: '004',
            date: new Date('2025-01-21').toDateString(),
            status: status.OPEN,
            content: "Просмотреть новые видео по интересующим темам на YouTube."
        }

    ]
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        create: (state, action: PayloadAction<string>) => {
            const created: Todo = {
                id: uuidv4(),
                date: new Date().toDateString(),
                status: status.OPEN,
                content: action.payload
            }
            state.data.push(created);
        },
        update: (state, action: PayloadAction<{ id: string; content: string }>) => {
            const { id, content: updatedContent } = action.payload;
            state.data = state.data.map(todo => todo.id !== id ? todo : { id: todo.id, date: todo.date, status: todo.status , content: updatedContent } )
           
        },
        updateStatus: (state,action: PayloadAction<{id: string, status: Status}>) => {
            const { id, status: updatedStatus } = action.payload;
            state.data = state.data.map(todo => todo.id !== id ? todo : { id: todo.id, date: todo.date, content: todo.content , status: updatedStatus } )
        },
        remove: (state,action:PayloadAction<string>) => {
            state.data = state.data.filter(todo => todo.id !== action.payload); 
        },
       
    }
})

export const {create, update, updateStatus,remove} = todoSlice.actions;

export default todoSlice.reducer;

export const selectAll = (state: RootState) => state.todos.data;

export const selectCompleted = createSelector([selectAll],(todos) => todos.filter(todo => todo.status === status.DONE) );

export const selectOpened = createSelector([selectAll],(todos) => todos.filter(todo => todo.status === status.OPEN) )