import { getUserProfileAsync } from "./actions";
import { getUserProfile } from "../../api/github";
import createAsyncThunk from "../../lib/createAsyncThunk";

// export function getUserProfileThunk(username: string) {
// 	return async (dispatch: Dispatch) => {
// 		// actions에서 만든 getUserProfileAsync 구조 분해 할당
// 		const { request, success, failure } = getUserProfileAsync;
// 		// 액션이 시작되었음을 알림
// 		dispatch(request());
// 		try {
// 			// api에 만들어 만든 api 요청 함수를 username을 전달해 호출
// 			const userProfile = await getUserProfile(username);
// 			dispatch(success(userProfile));
// 		}	catch(e) {
// 			dispatch(failure(e));
// 		}
// 	};
// }

export const getUserProfileThunk = createAsyncThunk(
	getUserProfileAsync,
	getUserProfile,
);