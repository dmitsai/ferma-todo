'use client';

import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status, Todo,status } from "~/shared/lib/todo.types";
import { v4 as uuidv4 } from 'uuid';
import { RootState } from "..";

export interface TodoState {
    data: Array<Todo>
}

const initialState:TodoState = {data: []};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Todo[]>) => {
            state.data = action.payload
          },
        create: (state, action: PayloadAction<string>) => {
            const created: Todo = {
                id: uuidv4(),
                date: new Date().toDateString(),
                status: status.OPEN,
                content: action.payload
            }
            state.data.unshift(created);
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

export const {create, update, updateStatus, remove, init} = todoSlice.actions;

export default todoSlice.reducer;

export const selectAll = (state: RootState) => state.todos.data;

export const selectCompleted = createSelector([selectAll],(todos) => todos.filter(todo => todo.status === status.DONE) );

export const selectOpened = createSelector([selectAll],(todos) => todos.filter(todo => todo.status === status.OPEN) )