import React from 'react';
import styled, { css } from "styled-components";
import PropTypes from 'prop-types';

const Container = styled.button`
	width: 30%;
	margin : 5px;
	padding : 10px 10px;
	${props =>
	props.role === "add" &&
	css`
		background-color: mediumpurple;
	`}
	${props =>
	props.role === "update" &&
	css`
		background-color: aquamarine;
	`}
	${props =>
	props.role === "remove" &&
	css`
		background-color: red;
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