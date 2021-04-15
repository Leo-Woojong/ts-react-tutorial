// 나중에 이 state를 사용하게 될때 만약 E 타입이 생략되면 any로 쓰겠다는 것
export type AsyncState<T, E = any> = {
	loading: boolean;
	data: T | null;
	error: E | null;
};

// 내부에 로딩 성공, 에러에 대한 함수를 만듦
export const asyncState = {
	initial: <T, E>(initialData?: T): AsyncState<T, E> => ({
		loading: false,
		data: initialData || null,
		error: null,
	}),
	load: <T, E>(data?: T | null): AsyncState<T, E> => ({
		loading: true,
		data: data || null,
		error: null,
	}),
	success: <T, E>(data: T): AsyncState<T, E> => ({
		loading: false,
		data,
		error: null,
	}),
	error: <T, E>(error: E): AsyncState<T, E> => ({
		loading: false,
		data: null,
		error,
	}),
}