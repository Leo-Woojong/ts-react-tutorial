import { getUserProfileAsync, GET_USER_PROFILE } from "./actions";
// call 특정 함수 호출, put 특정 액션을 dispatch, takeEvery 액션을 모니터링하다가 액션이 들어오면 원하는 액션에 대한 사가를 실행해줌
import { takeEvery } from 'redux-saga/effects';
import { getUserProfile } from "../../api/github";
import createAsyncSaga from "../../lib/createAsyncSaga";

// getUserProfileAsync를 통해 request의 타입을 가져옴
// function* getUserProfileSaga(action: ReturnType<typeof getUserProfileAsync.request>) {
// 	try {
// 		// 타입을 정해주지 않으면 타입이 any로 깨짐 즉, 타입 추론이 작동되지 않기 때문에 직접 작성해야함
// 		const userProfile: GithubProfile = yield call(getUserProfile, action.payload);
// 		yield put(getUserProfileAsync.success(userProfile));
// 	} catch (e) {
// 		yield put(getUserProfileAsync.failure(e));
// 	}
// }

const getUserProfileSaga = createAsyncSaga(getUserProfileAsync, getUserProfile);

export function* githubSaga() {
	yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
}