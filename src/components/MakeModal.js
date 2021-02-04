import React, {useState} from 'react';
import {Modal} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import styled from "styled-components";

function getModalStyle() {
	const top = 50;
	const left = 50

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: '20px'
	},
}));

const VoteQuestion = styled.h1`
	font-size: 25px;
	font-weight: 600;
`

const VoteDescription = styled.p`
	margin: 10px 0;
	line-height: 20px;
	
`

const OptionWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding : 12px;
	
	background-color: #D96459;
	color : white;
	margin-bottom: 5px;
	border-radius: 10px;
	
	span {
		pointer-events: none;
	}
	
	span.title {
		font-weight: 600;
	}
`

const OptionDetailWrapper = styled.div`
	
`

const UserInfo = styled.div`
	margin-bottom: 5px;
`

const OptionParticipant = styled.div`
	margin-bottom: 10px;
`

const MakeModal = (props) => {

	const classes = useStyles();
	const [modalStyle] = useState(getModalStyle);

	return (
		<Modal open={props.open} onClose={props.handleModalClick}>
			<div style={modalStyle} className={classes.paper}>
				<VoteQuestion>{props.vote.question}</VoteQuestion>
				<VoteDescription>
					{props.vote.description}
				</VoteDescription>
				{
					props.vote.options.map((option) => {
						return (
							<OptionDetailWrapper>
								<OptionWrapper>
									<span className={"title"}>{option.title}</span>
									<span className={"count"}>{option.voteUser.length}</span>
								</OptionWrapper>
								<OptionParticipant>
									{
										option.voteUser.map((user) => {
											return (
												<UserInfo>
													<span>{user.email}</span>
												</UserInfo>
											)
										})
									}
								</OptionParticipant>
							</OptionDetailWrapper>
						)
					})
				}
			</div>
		</Modal>
	);
};

export default MakeModal;