import { deprecated, ActionType, createReducer } from 'typesafe-actions';
const { createStandardAction } = deprecated;

// 액선 선언
// typesafe-actions 사용시 as const 사용하지 않아도 됨 
// ADD_TODO는 nextId가 파라미터를 통해 받아오는 값이 아니기때문에 as const를 사용한다.
const ADD_TODO = 'todos/ADD_TODO' as const;
const TOGGLE_TODO = 'todos/TOGGLE_TODO';
const REMOVE_TODO = 'todos/REMOVE_TODO';

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

// createStandardAction 사용시 액션 타입을 넣고 payload가 있다면 함수 뒤에 제네릭으로 타입 선언 후 다시 한번 호출
export const toggleTodo = createStandardAction(TOGGLE_TODO)<number>();
// export const toggleTodo = (id: number) => ({
// 	type: TOGGLE_TODO,
// 	payload: id
// });
export const removeTodo = createStandardAction(REMOVE_TODO)<number>();
// export const removeTodo = (id: number) => ({
// 	type: REMOVE_TODO,
// 	payload: id
// });

// 모든 액션 생성 함수가 반환하는 타입
// 액션들을 하나의 객체로 선언 후 ActionType을 사용하면 함수의 return 타입 정의 가능
const actions = { addtodo, toggleTodo, removeTodo };
type TogglesAction = ActionType<typeof actions>;
// type TogglesAction =
// 	| ReturnType<typeof addtodo>
// 	| ReturnType<typeof toggleTodo>
// 	| ReturnType<typeof removeTodo>;

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
// createReducer를 사용하면 제네릭으로 stateType과 액션type을 주고 initialState와 액션에 대한 업데이트 함수를 만들 수 있다.
const todos = createReducer<TodosState, TogglesAction>(initialState, {
	[ADD_TODO]: (state,action) => state.concat({
		...action.payload,
		done: false
	}),
	[TOGGLE_TODO]: (state, action) => state.map(
		todo => todo.id === action.payload ? { ...todo, done: !todo.done } : todo
	),
	[REMOVE_TODO]: (state, action) => state.filter(
		todo => todo.id !== action.payload
	)
})
// function todos(state: TodosState = initialState, action: TogglesAction): TodosState {
// 	switch (action.type) {
// 		case ADD_TODO:
// 			return state.concat({
// 				id: action.payload.id,
// 				text: action.payload.text,
// 				done: false,
// 			});
// 		case TOGGLE_TODO:
// 			return state.map(todo =>
// 				todo.id === action.payload ? { ...todo, done: !todo.done } : todo
// 			);
// 		case REMOVE_TODO:
// 			return state.filter(todo => todo.id !== action.payload);
// 		default:
// 			return state;
// 	}
// }

export default todos;