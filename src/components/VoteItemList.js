import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {firestoreConnect} from "react-redux-firebase";
import { getVotes, addVote, removeVote, updateVote, countVoting } from "../store/modules/votes"
import Item from "./Item";
import NewItem from "./NewItem";
import styled from "styled-components";
import {Redirect} from "react-router-dom";
import {signOut} from "../store/modules/auth";
import {addSavedVote, getStorage, removeSavedVote} from "../utils/localStorage";

const VoteItemList = props => {

	const { getVotes, countVoting, votes, auth } = props;
	const [state, setState] = useState({
		question : '',
		options : [{}, {}, {}],
		startDate : '',
		endDate : '',
	})
	// TO-DO : Modal로 투표 결과 보여주기, 종료시간이 지난 투표는 클릭 못하게, 투표 항목 이름 변경
	const [isEditQuestion, setIsEditQuestion] = useState(false);
	const currentTime = Date.now();

	console.log(auth)
	useEffect(() => {
		getVotes();
	}, [getVotes, countVoting])

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

	const handleAddOption = e => {
		e.preventDefault();
		setState({
			options: state.options.concat({})
		})
	}

	const handleLogout = e => {
		e.preventDefault();
		props.signOut();
	}

	const handleVoting = e => {
		e.preventDefault();
		const docId = e.target.id;
		const optionId = parseInt(e.target.getAttribute('data-optionid'), 10);

		const findVote = votes.find(vote => vote.id === docId);
		let findIndex = false;
		// 이미 투표를 했는지 확인 -> 아직 투표를 안했다면 카운트 늘려서 옵션 반환
		if (findVote) {
			findVote.options.forEach((option) => {
				const index = option.voteUser.indexOf(auth.uid)
				if (index >= 0) {
					findIndex = true;
					return false
				}
				return true;
			})
		}
		if (findIndex === false) {
				const newOption = findVote.options.map(option => {
					console.log(option, optionId, auth.uid, option.voteUser)
					return (
						option.id === optionId ?
							{...option, voteUser : option.voteUser.concat(auth.uid)} : option
					)
				})
				props.countVoting(docId, newOption)
			}
		}

	const handleAdd = (e) => {
		e.preventDefault()
		props.addVote({
			user : {
				id : auth.uid,
				email : auth.email
			},
			question : "Test Question 4",
			options : [{
					id : 1,
					title : "Test Option 1",
					voteUser : [],
				},
				{
					id : 2,
					title : "Test Option 2",
					voteUser : [],
				},
				{
					id : 3,
					title : "Test Option 3",
					voteUser : [],
				}
			],
			startDate : {
				nanoseconds: 0,
				seconds: Math.round(new Date().getTime() / 1000)
			},
			endDate : {
				nanoseconds : 0,
				seconds : Math.round(new Date().getTime() / 1000) + 100000
			},
		})
	}

	const handleSave = (e) => {
		e.preventDefault();
		const id = e.target.id;
		const newVote = votes.find(vote => vote.id === id);
		const savedVote = getStorage("USER_SAVE_VOTE");
		if (newVote) {
			if (savedVote.find(vote => vote.id === id)) {
				removeSavedVote(newVote);
			} else {
				addSavedVote(newVote);
			}
		}
	}

	if (!getStorage("USER_INFO")) return <Redirect to={"/auth"}/>
	return (
		<React.Fragment>
			<Header>
				<span onClick={handleLogout}>로그아웃</span>
			</Header>
			<VoteItemListWrapper>
				<NewItem
					handleInputChange={handleInputChange}
					handleAddOption={handleAddOption}
					question={state.question}
					options={state.options}
					handleAdd={handleAdd}
					startDate={state.startDate}
					endDate={state.endDate}
				/>
				<ItemList>
				{
					votes && votes.length > 0 ?
						votes.map(vote => {
							if (vote) return (
								<Item
									vote={vote}
									handleRemove={handleRemove}
									handleUpdate={handleUpdate}
									currentUserId={auth.uid}
									currentTime={currentTime}
									handleVoting={handleVoting}
									handleSave={handleSave}
								/>
							)
							else return null;
						}) : <div>없다</div>
				}
				</ItemList>
			</VoteItemListWrapper>
		</React.Fragment>
	);
};

const Header = styled.div`
	display: flex;
	justify-content: flex-end;
	height: 60px;
	
	span {
		background-color: cornflowerblue;
		margin : 10px;
		padding : 10px;
		border-radius: 10px;
		color : white;
	}
`

const VoteItemListWrapper = styled.div`
	max-width: 1180px;
	margin : 50px auto;
	display : flex;
	align-items: center;
	flex-direction: column;
`

const ItemList = styled.div`
	display: flex;
	justify-content: center;
	flex : 0 0 25%;
	flex-wrap: wrap;
	min-width: 420px;
`

const mapStateToProps = state => {
	return {
		votes : state.votes.votes,
		auth: state.firebase.auth,
	}
}

const mapDispatchToProps = dispatch => ({
	getVotes: () => dispatch(getVotes()),
	removeVote: (id) => dispatch(removeVote(id)),
	addVote : (vote) => dispatch(addVote(vote)),
	updateVote : (id, question) => dispatch(updateVote(id, question)),
	countVoting : (docId, newOption) => dispatch(countVoting(docId, newOption)),
	signOut : () => dispatch(signOut()),
})

export default compose(
	firestoreConnect([{collection : 'projects'}]),
	connect(mapStateToProps, mapDispatchToProps)
)(VoteItemList)