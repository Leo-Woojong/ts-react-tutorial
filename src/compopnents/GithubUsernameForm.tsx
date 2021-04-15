import React, { useState, FormEvent, ChangeEvent } from 'react';
import './GithubUsernameForm.css';

type GithubUsernameFormProps = {
	onSubmitUsername: (username: string) => void;
};

function GithubUsernameForm({ onSubmitUsername }: GithubUsernameFormProps) {
	const [input, setInput] = useState('');

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmitUsername(input);
		setInput('');
	}

	return (
		<form onSubmit={onSubmit} className="GithubUsernameForm">
			<input
				placeholder="Github 계정명을 입력하세요."
				onChange={onChange}
				value={input}
			/>
			<button type="submit">조회</button>
		</form>
	);
}

export default GithubUsernameForm;