import React, {useState} from 'react';
import styled from "styled-components"
import Button from "./Button";
import PropTypes from 'prop-types';
import MakeModal from "./MakeModal";
import Input from "./Input";

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

const ModalSection = styled.div`
	width: 100%;
`

const QuestionEditWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	
	button {
		margin-top: 10px;
	}
	button, input {
		width: 100%;
	}
`

const Item = ({
	vote,
	editedQuestionId,
	handleRemove,
	handleUpdate,
    handleVoting,
    handleSave,
	currentUserId,
    currentTime,
	handleQuestionChange,
    handleSubmitNewQuestion
}) => {

	const { id, question, options, user : { email, id : userId }, startDate, endDate} = vote;
	const newStartDate = new Date(startDate.seconds * 1000)
	const newEndDate = new Date(endDate.seconds * 1000)

	const [open, setOpen] = useState(false);

	const handleModalClick = (e) => {
		console.log(e.target)
		setOpen(!open);
	}

	return (
		<React.Fragment>
			<VoteItemWrapper>
				<VoteItem key={id}>
					<VoteHeader>
						{id === editedQuestionId ? (
							<QuestionEditWrapper>
								<Input onChange={handleQuestionChange} placeholder={question}/>
								<Button onClick={handleSubmitNewQuestion} value={"Edit Complete"}></Button>
							</QuestionEditWrapper>
						) : (<VoteQuestion>{question}</VoteQuestion>)}
					</VoteHeader>
					<VoteContinuing>{email}</VoteContinuing>
					<VoteContinuing>
					{
						currentTime <= newEndDate ?
							(currentTime < newStartDate ? "투표 예정" : "투표 진행중")
							: "투표 종료"
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

				<ModalSection onClick={handleModalClick}>
					<Button onClick={handleModalClick} value={"See Description"}/>
					<MakeModal open={open} onClose={handleModalClick} vote={vote}/>
				</ModalSection>
			</VoteItemWrapper>
		</React.Fragment>
	);
};

Item.propTypes = {
	vote : PropTypes.any.isRequired,
	handleRemove : PropTypes.func,
	handleUpdate : PropTypes.func,
}

export default Item
