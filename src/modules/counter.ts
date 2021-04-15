//액션 선언
const INCREASE = 'counter/INCREASE' as const;
// as const = <type>Value
// as const는 타입이 명확할때 사용할때 사용하는데 액션생성 함수에서 타입추론으로 string이 되는걸 막고 값 자체를 타입으로 넣기 위해 사용
const DECREASE = 'counter/DECREASE' as const;
const INCREASE_BY = 'counter/INCREASE_BY' as const;

//액션 생성 함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseBy = (diff: number) => ({
	type: INCREASE_BY,
	payload: diff,
});

// initialState를 위한 타입
type CounterState = {
	count: number;
};

// 초기state
const initialState: CounterState = {
	count: 0,
};

// 액션타입
// ReturnType<typeof func> 특정 함수의 리턴 값을 받아올 수 있다.
type CounterAction =
	| ReturnType<typeof increase>
	| ReturnType<typeof decrease>
	| ReturnType<typeof increaseBy>;

// reducer 함수의 리턴타입을 정해줘야 함수 내부에서 타입에러를 잡아줄 수 있다.
function counter(state: CounterState = initialState, action: CounterAction): CounterState {
	switch (action.type) {
		case INCREASE:
			return { count: state.count + 1 };
		case DECREASE:
			return { count: state.count - 1 };
		case INCREASE_BY:
			return { count: state.count + action.payload };
		default:
			return state;
	}
}

export default counter;