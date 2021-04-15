import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { increase, decrease, increaseBy } from '../modules/counter';
import Counter from '../compopnents/Counter';

function CounterContainer() {
	//useSelector로 state를 불러올 때 state의 타입을 적용해 불러온다.
	const count = useSelector((state: RootState) => state.counter.count);
	const dispatch = useDispatch();

	const onIncrease = () => {
		dispatch(increase());
	}

	const onDecrease = () => {
		dispatch(decrease());
	}
	const onIncreaseBy = (diff: number) => {
		dispatch(increaseBy(diff));
	}

	return (
		<Counter
			count={count}
			onIncrease={onIncrease}
			onDecrease={onDecrease}
			onIncreaseBy={onIncreaseBy}
		/>
	);
}

export default CounterContainer;