import React from 'react';
import styled from "styled-components"
import Button from "./Button";
import PropTypes from 'prop-types';

const VoteItemWrapper = styled.div`
	display: flex;
	flex-direction: column;
`

const VoteItem = styled.div`

`

const HandleButtonWrapper = styled.div`

`

const Item = ({
	vote,
	handleRemove,
	handleUpdate
}) => {
	const { id, question, options, name, startDate = 1, endDate = 1 } = vote;
	return (
		<VoteItemWrapper>
			<VoteItem key={id}>{id} {question}, {options}, {name}, {startDate.seconds}, {endDate.seconds} </VoteItem>
			<HandleButtonWrapper>
				<Button onClick={handleUpdate} value={"Handle Update"} id={id} role={"update"}/>
				<Button onClick={handleRemove} value={"Handle Remove"} id={id} role={"remove"}/>
			</HandleButtonWrapper>
		</VoteItemWrapper>
	);
};

Item.propTypes = {
	vote : PropTypes.any.isRequired,
	handleRemove : PropTypes.func,
	handleUpdate : PropTypes.func,
}
export default Item;