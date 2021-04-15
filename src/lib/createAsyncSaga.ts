import { AsyncActionCreatorBuilder, PayloadAction } from "typesafe-actions";
import { call, put } from 'redux-saga/effects';

// P는 PromiseCreatorFunction를 호출 할때 파라미터, T는 PromiseCreatorFunction에서 만든 promise에서 내보내는 결과 값을 의미
// 파라미터가 없어도 작동할 수 있게 만듦
type PromiseCreatorFunction<P, T> = ((payload: P) => Promise<T>) | (() => Promise<T>)

// 타입가드 undefined가 payload가 아니라면 파라미터로 받아온 action은 PayloadAction라는 의미
// PayloadAction<string, any> string은 action의 타입, any는 action의 payload(어떤 것이든 받아 올 수 있음)
function isPayloadAction(action: any): action is PayloadAction<string, any> {
	return action.payload !== undefined;
}
// (T1, P1 request) (T2, P2 success) (T3, P3 failure) 대한 액션 타입과 payload 타입
export default function createAsyncSaga<T1, P1, T2, P2, T3, P3>(
	asyncActionCreator: AsyncActionCreatorBuilder<
    // [액션타입 , 페이로드타입] or [액션타입 [페이로드타입,메타타입]]
    [T1, [P1, undefined]],
    [T2, [P2, undefined]],
    [T3, [P3, undefined]]
	>,
	// request는 파라미터가 결국 request의 payload이기 때문에 P1을 넣고
	// PromiseCreatorFunction가 끝났을 때 결과가 success의 payload이기 때문에 P2를 넣는다.
	promiseCreator: PromiseCreatorFunction<P1, P2>
) {
	return function* saga(action: ReturnType<typeof asyncActionCreator.request>) {
		try {
			// isPayloadAction(action)가 true이면 action에 payload가 있다는 것
			const result: P2 = isPayloadAction(action)
			? yield call(promiseCreator, action.payload)
			: yield call(promiseCreator);
			yield put(asyncActionCreator.success(result));
		} catch (e) {
			yield put(asyncActionCreator.failure(e));
		}
	}
}
