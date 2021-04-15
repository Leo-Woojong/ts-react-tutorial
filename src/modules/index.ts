import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';
import github, { githubSaga } from './github';
// rootSaga 생성을 위해 import
import { all } from 'redux-saga/effects';

// modules에서 작성한 reducer들을 추가하면 ReturnType을 했기때문에 자동으로 RootState 타입이 설정 됨
const rootReducer = combineReducers({
	counter,
	todos,
	github,
});
export default rootReducer;
//rootRducer도 결국 함수이기 때문에 Return<typeof func>를 사용해 리턴 값의 타입을 알 수 있다.
export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
	yield all([
		githubSaga(),
	]);
}