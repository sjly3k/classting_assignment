const LOCAL_STORAGE_USER = "USER_INFO"
const LOCAL_STORAGE_SAVE = "USER_SAVE_VOTE"

export const getStorage = (key) => {
	const value = localStorage.getItem(key);
	const parsedValue = value
		? JSON.parse(value)
		: key === LOCAL_STORAGE_SAVE ? [] : null
	return parsedValue
}

export const addSavedVote = (vote) => {
	const savedVotes = getStorage(LOCAL_STORAGE_SAVE);
	const nextSavedVotes = savedVotes.concat(vote);

	setStorage(LOCAL_STORAGE_SAVE, nextSavedVotes);
}

export const removeSavedVote = (removeVote) => {
	const savedVotes = getStorage(LOCAL_STORAGE_SAVE);
	const nextSavedVotes = savedVotes.filter((vote) => vote.id !== removeVote.id);

	setStorage(LOCAL_STORAGE_SAVE, nextSavedVotes)
}

export const removeStorage = () => {
	setStorage(LOCAL_STORAGE_USER, null)
	setStorage(LOCAL_STORAGE_SAVE, [])
}

export const setStorage = (key, value) => {
	const toJson = JSON.stringify(value);
	localStorage.setItem(key, toJson)
}