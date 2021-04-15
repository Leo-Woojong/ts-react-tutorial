import React, { useState, ChangeEvent, FormEvent } from 'react';

// container에서 onInsert를 가져오고 타입을 정해줌 (반환 값이 없기에 void)
type TodoInsertProps = {
	onInsert: (text: string) => void;
};

function TodoInsert({ onInsert }: TodoInsertProps) {
	// useState 사용시 반환 타입도 같기에 default값을 넣으면 자동으로 타입을 추론
	const [value, setValue] = useState('');

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onInsert(value);
		setValue('');
	}

	// html 태그들의 타입은 태그 작성 후 마우스를 올리면 나오고 해당 태그를 함수의 event 타입으로 사용
	return (
		<form onSubmit={onSubmit}>
			<input
				placeholder="할 일을 입력하세요."
				onChange={onChange}
				value={value}
			/>
			<button type="submit">등록</button>
		</form>
	);
}

export default TodoInsert;