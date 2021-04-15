import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { addtodo, toggleTodo, removeTodo } from '../modules/todos';
import TodoInsert from '../compopnents/TodoInsert';
import TodoList from '../compopnents/TodoList';

// container에서 따로 받아오는 props가 없기 때문에 propsType 생략
function TodoApp() {
	// useSelector 사용시 타입을 미리 정의해 놓은 RootState를 사용한다.
	const todos = useSelector((state: RootState) => state.todos);
	const dispatch = useDispatch();

	const onInsert = (text: string) => {
		dispatch(addtodo(text));
	}

	const onToggle = (id: number) => {
		dispatch(toggleTodo(id));
	}

	const onRemove = (id: number) => {
		dispatch(removeTodo(id));
	}

	return (
		<>
			<TodoInsert
				onInsert={onInsert}
			/>
			<TodoList
				todos={todos}
				onToggle={onToggle}
				onRemove={onRemove}
			/>
		</>
	);
}

export default TodoApp;