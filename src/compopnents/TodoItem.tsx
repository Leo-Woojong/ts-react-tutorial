import React, { CSSProperties } from 'react';
import { Todo } from '../modules/todos';

// modules에서 작성한 타입을 그대로 사용 export type Todo = { id: number;text: string;done: boolean; };
// container에서 받아오는 함수의 타입을 정의
type TodoItemProps = {
	todo: Todo;
	onToggle: (id: number) => void;
	onRemove: (id: number) => void;
};

function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
	const handleToggle = () => onToggle(todo.id);
	const handleRemove = () => onRemove(todo.id);

	const textStyle: CSSProperties = {
		textDecoration: todo.done ? 'line-through' : 'none',
	};

	const removeStyle: CSSProperties = {
		color: 'red',
		marginLeft: 8,
	};

	// style 객체를 정의할 땐 html 태그에 style을 넣고 마우스를 올리면 타입이 나옴
	return (
		<li>
			<span
				style={textStyle}
				onClick={handleToggle}
			>
					{todo.text}
			</span>
			<span
				style={removeStyle}
				onClick={handleRemove}
			>
				(X)
			</span>
		</li>
	);
}

export default TodoItem;