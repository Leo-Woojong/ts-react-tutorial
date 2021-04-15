import { Dispatch } from 'redux';
import { AsyncActionCreatorBuilder } from 'typesafe-actions';

type AnyAsyncActionCreator = AsyncActionCreatorBuilder<any, any, any>;
// 아무 파라미터나 가져오고 결과값이 프로미스이고 프로미스의 결과 값은 무엇이든 될 수 있도록 함
type AnyPromiseCreator = (...params: any[]) => Promise<any>;

// extends를 사용한 것은 A에 어떤 타입이든 될 수 있지만 AnyAsyncActionCreator 타입에 만족해야함
// 제네릭으로 어떤 것이든 가져올 수 있지만 해당 타입이 AnyAsyncActionCreator와 AnyPromiseCreator에 만족해야함
export default function createAsyncThunk<
	A extends AnyAsyncActionCreator,
	F extends AnyPromiseCreator
>(asyncActionCreator: A, promiseCreator: F) {
	// function sum과 같이 F 함수의 파라미터가 어떤게 있는지 추출함
	type Params = Parameters<F>;
	// createAsyncThunk가 호출되면 thunk를 리턴할건데 여기에 AnyPromiseCreator의 파라미터와 일치한 파라미터가 리턴되게 함
	return function thunk(...params: Params) {
		return async (dispatch: Dispatch) => {
			// asyncActionCreator가 AnyAsyncActionCreator를 extends하기 때문에 request, success, failure가 들어있음
			const { request, success, failure } = asyncActionCreator;
			dispatch(request());
			try {
				const result = await promiseCreator(...params);
				dispatch(success(result));
			} catch (e) {
				dispatch(failure(e));
			}
		};
	};
}

// function sum(a: number, b: number, c: string) {
// 	return a + b + c;
// }

// type P = Parameters<typeof sum>;