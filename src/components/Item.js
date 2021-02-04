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
	min-width: 350px;
`

const VoteItem = styled.div`
	width: 100%;
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
	width: 100%;
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
	width: 100%;
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
	handleRemove,
    handleVoting,
    handleSave,
	currentUserId,
    currentTime,
      newOptions,
      editedOptionId,
      handleUpdateOption,
      handleOptionTitleChange,
      handleSubmitNewOptions
}) => {

	const { id, question, options, user : { email, id : userId }, startDate, endDate} = vote;
	const newStartDate = new Date(startDate.seconds * 1000)
	const newEndDate = new Date(endDate.seconds * 1000)

	const [open, setOpen] = useState(false);

	const handleModalClick = (e) => {
		console.log(e.target)
		setOpen(!open);
	}

	function getToday(date){
		let year = date.getFullYear();
		let month = ("0" + (1 + date.getMonth())).slice(-2);
		let day = ("0" + date.getDate()).slice(-2);

		return year + "-" + month + "-" + day;
	}

	return (
		<React.Fragment>
			<VoteItemWrapper>
				<VoteItem key={id}>
					<VoteHeader>
						<VoteQuestion>{question}</VoteQuestion>
					</VoteHeader>
					<VoteContinuing>{email}</VoteContinuing>
					<VoteContinuing>
					{
						currentTime <= newEndDate ?
							(currentTime < newStartDate ? "투표 예정" : "투표 진행중")
							: "투표 종료"
					}
					</VoteContinuing>
					<VoteDate>{getToday(newStartDate)} ~ {getToday(newEndDate)}</VoteDate>
					<VoteOptions>
						{
							id === editedOptionId ? (
								options.map((option, index) => {
									return (
											<QuestionEditWrapper id={id} data-optionid={option.id}>
												<Input onChange={handleOptionTitleChange(index)} name={`option-${index}`} placeholder={newOptions[index].title}/>
											</QuestionEditWrapper>
									)
								})
							) : (
								options.map((option) => {
									return (
										<OptionWrapper id={id} data-optionid={option.id} onClick={handleVoting}>
											<span className={"title"}>{option.title}</span>
											<span className={"count"}>{option.voteUser.length}</span>
										</OptionWrapper>
									)
								})
							)
						}
						{
							id === editedOptionId ?
								(<Button onClick={handleSubmitNewOptions} value={"Edit Complete"} />)
								: (null)
						}
					</VoteOptions>
				</VoteItem>
				<HandleButtonWrapper>
				{
					currentUserId === userId ? (
						<CurrentUsrButtonWrapper>
							<Button onClick={handleUpdateOption} value={"Update Option"} id={id} role={"update"}/>
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
