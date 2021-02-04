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
import {addSavedVote, getStorage, removeSavedVote, updateSavedVote} from "../utils/localStorage";
import {toast} from "react-toastify";

const dateformat = require("dateformat");

const VoteItemList = props => {

	const { getVotes, countVoting, votes, auth } = props;
	const [state, setState] = useState({
		question : '',
		description : '',
		options : [{}, {}, {}],
	})
	const [savedVote, setSavedVote] = useState(null);
	const [startDate, setStartDate] = useState(dateformat(new Date(), "isoDate"));
	const [endDate, setEndDate] = useState(dateformat(new Date(), "isoDate"))
	const [editedQuestionId, setEditedQuestionId] = useState("");
	const [newQuestion, setNewQuestion] = useState("")

	// TO-DO :
	// Modal로 투표내용 보기, (0)
	// 종료시간이 지난 투표는 클릭 못하게, (0)
	// 투표 항목 이름 변경
	// 투표 질문 add 하기 (0)
	// 시작 / 종료 선택하게 하기 (0)
	const currentTime = Date.now();

	useEffect(() => {
		async function getSavedVote() {
			setSavedVote(getStorage("USER_SAVE_VOTE"));
		}

		getSavedVote();
	}, [])

	useEffect(() => {
		getVotes();
	}, [getVotes, countVoting])

	const handleOptionChange = (i) => (e) => {
		const value = e.target.value;
		const name = e.target.name;

		if (name === `option-${i + 1}`) {
			let options = [...state.options];
			options[i] = {
				id : i + 1,
				title : value,
				voteUser : [],

			}
			setState({
				...state,
				options : options
			})
		}
	}

	const handleInputChange = (e) => {
		const value = e.target.value;
		const name = e.target.name;

		console.log(value, name)
		setState({
			...state,
			[name]: value
		})
	}

	const handleQuestionChange = (e) => {
		const value = e.target.value
		setNewQuestion(value);
	}

	const handleRemove = (e) => {
		e.preventDefault()
		const id = e.target.id
		props.removeVote(id);
		removeSavedVote(id);
		setSavedVote(getStorage("USER_SAVE_VOTE"));
	}

	const handleUpdate = (e) => {
		const id = e.target.id;
		setEditedQuestionId(id);
	}

	const handleSubmitNewQuestion = () => {
		if (editedQuestionId !== "" && newQuestion !== "") {
			props.updateVote(editedQuestionId, newQuestion)
			setEditedQuestionId("")

			let newVote = votes.find(vote => vote.id === editedQuestionId)
			newVote = {...newVote, question: newQuestion}
			if (newVote) {
				updateSavedVote(editedQuestionId, newVote)
				setSavedVote(getStorage("USER_SAVE_VOTE"));
			}
		}
	}

	const handleAddOption = e => {
		e.preventDefault();
		setState({
			...state,
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

			if (currentTime >= new Date(findVote.endDate.seconds * 1000)) {
				toast.info("종료된 투표이므로 참여하실 수 없습니다.")
				return;
			}

			if (currentTime < new Date(findVote.startDate.seconds * 1000)) {
				toast.info("시작 전 투표이므로 참여하실 수 없습니다.")
				return;
			}

			findVote.options.forEach((option) => {
				const index = option.voteUser.find(user => user.id === auth.uid)
				if (index) {
					toast.info("이미 투표하셨습니다.")
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
							{...option, voteUser : option.voteUser.concat({ id : auth.uid, email : auth.email })} : option
					)
				})
				props.countVoting(docId, newOption)

				let newVote = votes.find(vote => vote.id === docId)
				newVote = {...newVote, options: newOption}
				if (newVote) {
					updateSavedVote(docId, newVote)
					setSavedVote(getStorage("USER_SAVE_VOTE"));
				}
			}
		}

	const handleAdd = (e) => {
		e.preventDefault()

		const newVote = {
			user: {
				id: auth.uid,
				email: auth.email
			},
			question: state.question,
			options: state.options,
			startDate: {
				seconds: Math.round(new Date(startDate._d).getTime() / 1000),
				nanoseconds: 0
			},
			endDate: {
				seconds: Math.round(new Date(endDate._d).getTime() / 1000),
				nanoseconds: 0
			},
			description: state.description
		}

		console.log(newVote.options.find((option) => option === {}))
		if (newVote.question === ""
			|| newVote.description === ''
			|| isNaN(newVote.startDate.seconds)
			|| isNaN(newVote.endDate.seconds)
			|| !newVote.user.id
			|| newVote.options.find((option) => option === {}) !== undefined
		) {
			toast.error("투표에 대한 모든 정보를 입력해주세요.");
			return;
		}

		props.addVote(newVote)
	}

	const handleSave = (e) => {
		e.preventDefault();
		const id = e.target.id;
		const newVote = votes.find(vote => vote.id === id);
		const savedVote = getStorage("USER_SAVE_VOTE");
		if (newVote) {
			if (savedVote.find(vote => vote.id === id)) {
				removeSavedVote(id);
				toast.info("투표 저장을 취소하셨습니다.")
			} else {
				addSavedVote(newVote);
				toast.info("투표를 저장하셨습니다.")
			}
		}

		setSavedVote(getStorage("USER_SAVE_VOTE"));
	}

	if (!getStorage("USER_INFO")) return <Redirect to={"/auth"}/>
	return (
		<React.Fragment>
			<Header>
				<h3>{auth.email}</h3>
				<span onClick={handleLogout}>로그아웃</span>
			</Header>
			<VoteItemListWrapper>
				<NewItemWrapper>
					<div>
						<Title>
							새로운 투표 만들기
						</Title>
					</div>
					<NewItem
						handleInputChange={handleInputChange}
						handleOptionChange={handleOptionChange}
						handleAddOption={handleAddOption}
						question={state.question}
						options={state.options}
						handleAdd={handleAdd}
						description={state.description}
						setStartDate={setStartDate}
						setEndDate={setEndDate}
					/>
				</NewItemWrapper>
				<ItemListWrapper>
					<Title>
						내가 저장한 투표
					</Title>
					<ItemList>
						{
							savedVote && savedVote.length > 0 ?
								savedVote.map(vote => {
									if (vote) return (
										<Item
											editedQuestionId={editedQuestionId}
											handleSubmitNewQuestion={handleSubmitNewQuestion}
											handleQuestionChange={handleQuestionChange}
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
								}) : <div>저장한 투표가 없어요.</div>
						}
					</ItemList>
				</ItemListWrapper>
				<ItemListWrapper>
					<Title>
						존재하는 투표 목록
					</Title>
					<ItemList>
					{
						votes && votes.length > 0 ?
							votes.map(vote => {
								if (vote) return (
									<Item
										editedQuestionId={editedQuestionId}
										handleSubmitNewQuestion={handleSubmitNewQuestion}
										handleQuestionChange={handleQuestionChange}
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
							}) : <div>새로운 투표를 만들어주세요.</div>
					}
				</ItemList>
				</ItemListWrapper>
			</VoteItemListWrapper>
		</React.Fragment>
	);
};

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 60px;
	
	span {
		background-color: cornflowerblue;
		margin : 10px;
		padding : 10px;
		border-radius: 10px;
		color : white;
		cursor : pointer;
	}
`

const Title = styled.h2`
	width: 100%;
	font-weight: 600;
	font-size: 25px;
	margin-bottom: 10px;
`

const ItemListWrapper = styled.div`
	padding-top: 30px;
	border-top : 3px solid gray;
	width: 100%;
	margin-bottom: 20px;
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
	flex : 0 0 25%;
	flex-wrap: wrap;
	min-width: 420px;
`

const NewItemWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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