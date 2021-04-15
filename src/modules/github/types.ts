import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { GithubProfile } from '../../api/github';
import { AsyncState } from '../../lib/reducerUtils';

// 액션 생성 함수의 리턴 타입이 들어있다.
export type GithubAction = ActionType<typeof actions>;
// 리듀서에서 관리할 상태의 타입
export type GithubState = {
	// AsyncState의 첫번째 제너릭은 성공했을 시 타입, 두번째 제너릭은 실패헸을 시 타입
	userProfile: AsyncState<GithubProfile, Error>
};