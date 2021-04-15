// 액선 선언
const ADD_TODO = 'todos/ADD_TODO' as const;
const TOGGLE_TODO = 'todos/TOGGLE_TODO' as const;
const REMOVE_TODO = 'todos/REMOVE_TODO' as const;

// unique id
let nextId = 1;

//액션 생성 함수 (액션 type에 따른 함수)
export const addtodo = (text: string) => ({
	type: ADD_TODO,
	payload: {
		id: nextId++,
		text
	}
});

export const toggleTodo = (id: number) => ({
	type: TOGGLE_TODO,
	payload: id
});

export const removeTodo = (id: number) => ({
	type: REMOVE_TODO,
	payload: id
});

// 모든 액션 함수가 반환하는 타입
type TogglesAction =
	| ReturnType<typeof addtodo>
	| ReturnType<typeof toggleTodo>
	| ReturnType<typeof removeTodo>;

// 상태에서 사용할 할 일 항목 데이터
// export로 내보내는 이유는 해당 타입을 컴포넌트에서도 사용할 것이기 때문
export type Todo = {
	id: number;
	text: string;
	done: boolean;
};

// state에 대한 타입은 Todo타입으로 이루어진 배열
type TodosState = Todo[];

// 초기 상태
const initialState: TodosState = [];

// reducer 함수
// state는 TodosState타입으로 이루어진 initialState, action은 TogglesAction의 타입, 반환 타입 또한 TodosState
function todos(state: TodosState = initialState, action: TogglesAction): TodosState {
	switch (action.type) {
		case ADD_TODO:
			return state.concat({
				id: action.payload.id,
				text: action.payload.text,
				done: false,
			});
		case TOGGLE_TODO:
			return state.map(todo =>
				todo.id === action.payload ? { ...todo, done: !todo.done } : todo
			);
		case REMOVE_TODO:
			return state.filter(todo => todo.id !== action.payload);
		default:
			return state;
	}
}

export default todos;