import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {firestoreConnect} from "react-redux-firebase";
import { getVotes, addVote, removeVote, updateVote } from "../store/modules/votes"
import {useInput} from "../hooks/useInput";
import Item from "./Item";

const VoteItemList = props => {

	const { getVotes, removeVote, updateVote, addVote, votes } = props;
	const question = useInput('');
	const option = useInput('')
	const [options, setOptions] = useState([]);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	useEffect(() => {
		getVotes();
	}, [getVotes])


	const handleRemove = (e) => {
		e.preventDefault()
		const id = e.target.id
		props.removeVote(id);
	}

	const handleUpdate = (e) => {
		console.log(e.target.id)
		const id = e.target.id;
		const input = e.target.input;

		props.updateVote(id, "Change 5")

	}

	const handleAdd = (e) => {
		e.preventDefault()
		props.addVote({
			name : "Lee",
			question : "Test Question 4",
			options : [
				"Test Option 1",
				"Test Option 2",
				"Test Option 3",
			],
			startDate : {
				nanoseconds: 0,
				seconds: 1612852562
			},
			endDate : {
				nanoseconds : 0,
				seconds : 1612247773
			}
		})
	}

	return (
		<div>
			<input {...question} placeholder={"질문"}/>
			<input {...option} placeholder={"옵션"}/>
			{
				votes && votes.length > 0 ?
					votes.map(vote => {
						if (vote) return (
							<Item
								vote={vote}
								handleRemove={handleRemove}
								handleUpdate={handleUpdate}
								handleAdd={handleAdd}
							/>
						)
						else return null;
					}) : <div>없다</div>
			}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		votes : state.votes.votes
	}
}

const mapDispatchToProps = dispatch => ({
	getVotes: () => dispatch(getVotes()),
	removeVote: (id) => dispatch(removeVote(id)),
	addVote : (vote) => dispatch(addVote(vote)),
	updateVote : (id, question) => dispatch(updateVote(id, question))
})

export default compose(
	firestoreConnect([{collection : 'projects'}]),
	connect(mapStateToProps, mapDispatchToProps)
)(VoteItemList);