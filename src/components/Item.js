import React from 'react';
import styled from "styled-components"
import Button from "./Button";
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';


const VoteItemWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 10px;
	
	background-color: #F2EDDF;
	border-radius: 10px;
	padding : 20px;
`

const VoteItem = styled.div`
	
`

const VoteHeader = styled.div`
	display: flex;
	justify-content: space-between;
`

const VoteQuestion = styled.h1`
	font-size: 25px;
	font-weight: 600;
`

const VoteOptions = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
`
const VoteDate = styled.div`
   margin: 10px 0px;
   font-size: 12px;
   font-weight: 400;
`

const CurrentUsrButtonWrapper = styled.div`
	margin-bottom: 10px;
	display: flex;
`

const VoteContinuing = styled(VoteDate)`
	font-size: 14px;
`

const HandleButtonWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`

const OptionWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding : 12px;
	
	background-color: #D96459;
	color : white;
	margin-bottom: 5px;
	border-radius: 10px;
	cursor: pointer;
	
	span {
		pointer-events: none;
	}
	
	span.title {
		font-weight: 600;
	}
`

const Item = ({
	vote,
	handleRemove,
	handleUpdate,
    handleVoting,
    handleSave,
	currentUserId,
    currentTime,
}) => {

	const { id, question, options, user : { email, id : userId }, startDate, endDate} = vote;
	const newStartDate = new Date(startDate.seconds * 1000)
	const newEndDate = new Date(endDate.seconds * 1000)

	console.log(vote)
	return (
		<VoteItemWrapper>
			<VoteItem key={id}>
				<VoteHeader>
					<VoteQuestion>{question}</VoteQuestion>
					<EditIcon />
				</VoteHeader>
				<VoteContinuing>{email}</VoteContinuing>
				<VoteContinuing>
				{
					currentTime <= newEndDate ? "투표 진행중" : "투표 종료"
				}
				</VoteContinuing>
				<VoteDate>{newStartDate.toLocaleString()} ~ {newEndDate.toLocaleString()}</VoteDate>
				<VoteOptions>
					{
						options.map((option) => {
							return (
								<OptionWrapper id={id} data-optionid={option.id} onClick={handleVoting}>
									<span className={"title"}>{option.title}</span>
									<span className={"count"}>{option.voteUser.length}</span>
								</OptionWrapper>
							)
						})
					}
				</VoteOptions>
			</VoteItem>
			<HandleButtonWrapper>
			{
				currentUserId === userId ? (
					<CurrentUsrButtonWrapper>
						<Button onClick={handleUpdate} value={"Update Question"} id={id} role={"update"}/>
						<Button onClick={handleRemove} value={"Remove Vote"} id={id} role={"remove"}/>
					</CurrentUsrButtonWrapper>
				) : (null)
			}
				<Button onClick={handleSave} value={"Save Vote"} id={id} role={"save"}/>
			</HandleButtonWrapper>
		</VoteItemWrapper>
	);
};

Item.propTypes = {
	vote : PropTypes.any.isRequired,
	handleRemove : PropTypes.func,
	handleUpdate : PropTypes.func,
}

export default Item
