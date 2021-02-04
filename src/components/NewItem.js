import React from 'react';
import styled from "styled-components"
import Input from "./Input";
import Button from "./Button";
import Datetime from "react-datetime";

const startDateInputProps = {
	placeholder: '시작 날짜를 선택해주세요.',
	name : "start-date"
};

const endDateInputProps = {
	placeholder: '종료 날짜를 선택해주세요.',
	name : "end-date"
}

const NewItem = (props) => {
	const { question, options, description, handleAdd, handleOptionChange, setStartDate,
		setEndDate, handleInputChange, handleAddOption } = props;
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
					<InputRow>
						<Input
							placeholder={"투표 상세 설명"}
							name={"description"}
							value={description}
							required={true}
							onChange={handleInputChange}
						/>
					</InputRow>
					{
						options.map((option, index) => (
							<InputRow>
								<Input
									name={`option-${index + 1}`}
									onChange={handleOptionChange(index)}
									required={true}
									placeholder={`투표 옵션 ${index + 1}을 입력해주세요.`}
								/>
							</InputRow>
						))
					}
					<Button onClick={handleAddOption} value={"Add Option"} role={"add"}/>
					<InputRow>
						<Datetime
							inputProps={startDateInputProps}
							dateFormat="YYYY-MM-DD"
							utc={false}
							timeFormat={false}
							onChange={(e) => setStartDate(e)}
						/>
					</InputRow>
					<InputRow>
						<Datetime
							inputProps={endDateInputProps}
							dateFormat="YYYY-MM-DD"
							utc={false}
							timeFormat={false}
							onChange={(e) => setEndDate(e)}
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
	
	.rdt {
		margin: 5px 0;
		height: 40px;
		width: 100%;
		border-radius: 10px;
		border: 1px solid gray;
	}
	
	input.form-control {
		padding-left: 10px;
		height: 40px;
		width: 100%;
	}
	
	
`

export default NewItem;