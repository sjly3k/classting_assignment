import React from 'react';
import styled from "styled-components";

const Container = styled.input`
	width: 100%;
	border : 1.5px solid gray;
	border-radius: 10px;
	margin : 5px 0px;
	padding : 10px 10px;
`

const Input = ({
	placeholder,
	type="text",
	required=true,
	name="",
	className,
	value,
	onChange,
	color
}) => {
	return (
		<Container
			placeholder={placeholder}
			type={type}
			required={required}
			name={name}
			className={className}
			value={value}
			onChange={onChange}
			color={color}
		/>
	);
};

export default Input;