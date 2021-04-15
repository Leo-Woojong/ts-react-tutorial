import { deprecated, ActionType, createReducer } from 'typesafe-actions';
const { createStandardAction } = deprecated;

// typesafe-actions 사용시 as const 사용하지 않아도 됨
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_BY = 'counter/INCREASE_BY';

// createStandardAction 사용시 액션 타입을 넣고 payload가 있다면 함수 뒤에 제네릭으로 타입 선언 후 다시 한번 호출
export const increase = createStandardAction(INCREASE)();
export const decrease = createStandardAction(DECREASE)();
export const increaseBy = createStandardAction(INCREASE_BY)<number>();
// typesafe-actions 사용할 때와 비교  해 보자
// export const increaseBy = (diff: number) => ({
// 	type: INCREASE_BY,
// 	payload: diff,
// });

// initialState를 위한 타입
type CounterState = {
	count: number;
};

// 초기state
const initialState: CounterState = {
	count: 0,
};

// 액션타입
// 액션들을 하나의 객체로 선언 후 ActionType을 사용하면 함수의 return 타입 정의 가능
const actions = { increase, decrease, increaseBy };
type CounterAction = ActionType<typeof actions>;
// type CounterAction =
// 	| ReturnType<typeof increase>
// 	| ReturnType<typeof decrease>
// 	| ReturnType<typeof increaseBy>;

// 리듀서
// createReducer를 사용하면 제네릭으로 stateType과 액션type을 주고 initialState와 액션에 대한 업데이트 함수를 만들 수 있다.
const counter = createReducer<CounterState, CounterAction>(initialState, {
	[INCREASE]: state => ({ count: state.count + 1 }),
	[DECREASE]: state => ({ count: state.count - 1 }),
	[INCREASE_BY]: (state, action) => ({ count: state.count + action.payload })
});
// function counter(state: CounterState = initialState, action: CounterAction): CounterState {
// 	switch (action.type) {
// 		case INCREASE:
// 			return { count: state.count + 1 };
// 		case DECREASE:
// 			return { count: state.count - 1 };
// 		case INCREASE_BY:
// 			return { count: state.count + action.payload };
// 		default:
// 			return state;
// 	}
// }

export default counter;