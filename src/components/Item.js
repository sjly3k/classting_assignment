import React from 'react';
import styled, {css} from "styled-components"

const VoteItemWrapper = styled.div`
	display: flex;
	flex-direction: column;
`

const VoteItem = styled.div`

`

const HandleButtonWrapper = styled.div`

`

const HandleButton = styled.button`
	margin : 5px;
	padding : 10px 10px;
	${props =>
	props.add &&
	css`
		background-color: mediumpurple;
	`}
	${props =>
	props.update &&
	css`
		background-color: aquamarine;
	`}
	${props =>
	props.remove &&
	css`
		background-color: red;
	`}
`
const Item = ({
	vote,
	handleAdd,
	handleRemove,
	handleUpdate
}) => {
	const { id, question, options, name, startDate = 1, endDate = 1 } = vote;
	return (
		<VoteItemWrapper>
			<VoteItem key={id}>{id} {question}, {options}, {name}, {startDate.seconds}, {endDate.seconds} </VoteItem>
			<HandleButtonWrapper>
				<HandleButton onClick={handleAdd} add>Handle Add</HandleButton>
				<HandleButton onClick={handleUpdate} id={id} update>Handle Update</HandleButton>
				<HandleButton onClick={handleRemove} id={id} remove>Handle Remove</HandleButton>
			</HandleButtonWrapper>
		</VoteItemWrapper>
	);
};

export default Item;