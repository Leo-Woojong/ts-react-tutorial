import React from 'react';

// count를 제외한 값은 다른 파일에서 props로 받아온다.
type CounterProprs = {
	count: number;
	onIncrease: () => void;
	onDecrease: () => void;
	onIncreaseBy: (diff: number) => void;
};

function Counter({ count, onIncrease, onDecrease, onIncreaseBy }: CounterProprs) {
	
	return (
		<div>
			<h1>{count}</h1>
			<button onClick={onIncrease}>+1</button>
			<button onClick={onDecrease}>-1</button>
			<button onClick={() =>onIncreaseBy(5)}>+5</button>
		</div>
	);
}

export default Counter;