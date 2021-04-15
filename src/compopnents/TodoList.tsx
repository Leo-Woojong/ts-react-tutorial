import React from 'react';
import { Todo } from '../modules/todos';
import TodoItem from './TodoItem';

// todos는 미리 정의한 타입을 가져와 []배열로 사용하고 container에서 받아오는 함수의 타입 정의
type TodoListProps = {
	todos: Todo[];
	onToggle: (id: number) => void;
	onRemove: (id: number) => void;
};

function TodoList({ todos, onToggle, onRemove }: TodoListProps) {
	if (todos.length === 0) return <p>등록 된 항목이 없습니다.</p>

	return (
		<ul>
			{todos.map(todo =>
				// key 값이 없으면 렌더링이 비효율적으로 일어나고 경고 메세지가 뜨기 때문에 고유한 key 값을 넣어준다.
				<TodoItem todo={todo} onToggle={onToggle} onRemove={onRemove} key={todo.id} />
			)}
		</ul>
	);
}

export default TodoList;