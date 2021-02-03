import React from 'react';
import {connect} from "react-redux";
import {addVote} from "../store/modules/votes";
import styled from "styled-components"
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";

const InputWrapper = styled.div`

`

const InputRow = styled.div`

`

const NewItem = (props) => {

	const { question, options, handleAdd, startDate, endDate, handleInputChange } = props;
	return (
		<Form submitFunction={handleAdd}>
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
				<Button onClick={handleAdd} value={"Handle Add"} role={"add"}/>
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
			</InputWrapper>
		</Form>
	);
};

export default NewItem;