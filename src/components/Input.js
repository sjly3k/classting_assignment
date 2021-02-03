import React from 'react';
import styled from "styled-components";

const Container = styled.input`

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