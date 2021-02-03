import React from 'react';
import styled from "styled-components"
import Input from "./Input";
import Button from "./Button";

const NewItem = (props) => {

	const { question, options, handleAdd, startDate, endDate, handleInputChange, handleAddOption } = props;
	return (
		<NewItemWrapper>
			<form onSubmit={handleAdd}>
				<InputWrapper>
					<InputRow>
						<Input
							placeholder={"투표 질문"}
							name={"question"}
							value={question}
							required={true}
							onChange={handleInputChange}
						/>
					</InputRow>
					{
						options.map((option, index) => (
							<InputRow>
								<Input
									name={`option-${index + 1}`}
									onChange={handleInputChange(index)}
									required={true}
									placeholder={`투표 옵션 ${index + 1}을 입력해주세요.`}
								/>
							</InputRow>
						))
					}
					<Button onClick={handleAddOption} value={"Add Option"} role={"add"}/>
					<InputRow>
						<Input
							placeholder={"투표 시작"}
							name={"startDate"}
							value={startDate}
							required={true}
							onChange={handleInputChange}
						/>
					</InputRow>
					<InputRow>
						<Input
							placeholder={"투표 종료"}
							name={"endDate"}
							value={endDate}
							required={true}
							onChange={handleInputChange}
						/>
					</InputRow>
					<Button onClick={handleAdd} value={"Add Vote"} role={"add"}/>
				</InputWrapper>
			</form>
		</NewItemWrapper>
	);
};

const NewItemWrapper = styled.div`
	min-width: 320px;
	margin-bottom: 20px;
`

const InputWrapper = styled.div`
	margin: 0 auto;
	display: flex;
	align-items: center;
	vertical-align: center;
	flex-direction: column;
	
	width: 100%;
	max-width : 416px;
`

const InputRow = styled.div`
	width: 100%;
`

export default NewItem;