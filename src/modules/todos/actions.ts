import { deprecated } from "typesafe-actions";
const { createStandardAction } = deprecated;

export const ADD_TODO = 'todos/ADD_TODO' as const;
export const TOGGLE_TODO = 'todos/TOGGLE_TODO';
export const REMOVE_TODO = 'todos/REMOVE_TODO';

let nextId = 1;

export const addtodo = (text: string) => ({
	type: ADD_TODO,
	payload: {
		id: nextId++,
		text
	}
});

export const toggleTodo = createStandardAction(TOGGLE_TODO)<number>();
export const removeTodo = createStandardAction(REMOVE_TODO)<number>();