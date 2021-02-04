import React from 'react';
import styled, { css } from "styled-components";
import PropTypes from 'prop-types';

const Container = styled.button`
	width: 100%;
	padding : 10px 10px;
	border: none;
	border-radius: 10px;
	color : white;
	font-weight: bold;
	background-color: purple;
	margin-bottom: 10px;
	cursor: pointer;
	${props =>
	props.role === "add" &&
	css`
		background-color: mediumpurple;
	`}
	${props =>
	props.role === "update" &&
	css`
		background-color: #F2A516;
	`}
	${props =>
	props.role === "remove" &&
	css`
		background-color: #F21D44;
	`}
`
const Button = (
	{
		value,
		onClick,
		disabled = false,
		className = null,
		role,
		id
	}
) => {
	return (
		<Container
			className={className}
			onClick={onClick}
			disabled={disabled}
			role={role}
			type="submit"
			id={id}
		>{value}</Container>
	);
};

Button.propTypes = {
	innerText : PropTypes.string,
	onClick : PropTypes.func,
	disabled : PropTypes.bool,
	role : PropTypes.string,
};

export default Button;