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
	margin-top: 10px;
	line-height: 20px;
`

const MakeModal = (props) => {

	console.log(props)
	const classes = useStyles();
	const [modalStyle] = useState(getModalStyle);

	return (
		<Modal open={props.open} onClose={props.handleModalClick}>
			<div style={modalStyle} className={classes.paper}>
				<VoteQuestion>{props.text.question}</VoteQuestion>
				<VoteDescription>
					{props.text.description}
				</VoteDescription>
			</div>
		</Modal>
	);
};

export default MakeModal;