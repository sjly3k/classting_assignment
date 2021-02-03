import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {firestoreConnect} from "react-redux-firebase";
import { getVotes, addVote, removeVote, updateVote } from "../store/modules/votes"
import {useInput} from "../hooks/useInput";
import Item from "./Item";
import NewItem from "./NewItem";

const VoteItemList = props => {

	const { getVotes, votes } = props;
	const [state, setState] = useState({
		question : '',
		options : ['', '', ''],
		startDate : '',
		endDate : '',
	})

	useEffect(() => {
		getVotes();
	}, [getVotes])

	const handleInputChange = (i=null) => (e) => {
		const value = e.target.value;
		const name = e.target.name;

		console.log(i, value, name)
		if (name === `option-${i + 1}`) {
			let options = [...state.options];
			options[i] = value;
			setState({
				...state,
				options
			})
		}
		else {
			setState({
				...state,
				[name]: value
			})
		}
	}

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

	console.log(state)

	return (
		<div>
			<NewItem
				handleInputChange={handleInputChange}
				question={state.question}
				options={state.options}
				handleAdd={handleAdd}
				startDate={state.startDate}
				endDate={state.endDate}
			/>
			{
				votes && votes.length > 0 ?
					votes.map(vote => {
						if (vote) return (
							<Item
								vote={vote}
								handleRemove={handleRemove}
								handleUpdate={handleUpdate}
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