import { createReducer } from 'typesafe-actions';
import { GithubState, GithubAction } from './types';
import { GET_USER_PROFILE, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_ERROR } from './actions';
import { asyncState } from '../../lib/reducerUtils';

// 초기 상태
const initialState: GithubState = {
	userProfile: asyncState.initial(),
};

const github = createReducer<GithubState, GithubAction>(initialState, {
	[GET_USER_PROFILE]: (state) => ({
		...state,
		// 로딩 시 데이터를 유지하려면 load에 data를 넣어주면 된다.
		userProfile: asyncState.load(state.userProfile.data),
	}),
	[GET_USER_PROFILE_SUCCESS]: (state, action) => ({
		...state,
		userProfile: asyncState.success(action.payload),
	}),
	[GET_USER_PROFILE_ERROR]: (state, action) => ({
		...state,
		userProfile: asyncState.error(action.payload),
	}),
});

export default github;