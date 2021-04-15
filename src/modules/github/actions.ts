import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { GithubProfile } from '../../api/github';

export const GET_USER_PROFILE = 'github/GET_USER_PROFILE';
export const GET_USER_PROFILE_SUCCESS = 'github/GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_ERROR = 'github/GET_USER_PROFILE_ERROR';

// createAsyncAction는 성공, 요청, 실패 순서로 액션을 넣어주고 제네릭으로 각 액션의 payload 타입을 넣어준다.
export const getUserProfileAsync = createAsyncAction(
	GET_USER_PROFILE,
	GET_USER_PROFILE_SUCCESS,
	GET_USER_PROFILE_ERROR
)<string, GithubProfile, AxiosError>();
// AxiosError는 axios에서 에러 발생 시 사용하는 타입

// export const getUserProfile = createAsyncAction(GET_USER_PROFILE)();
// export const getUserProfileSuccess = createStandardAction(GET_USER_PROFILE_SUCCESS)<GithubProfile>();
// export const getUserProfileError = createStandardAction(GET_USER_PROFILE_ERROR)<AxiosError>();