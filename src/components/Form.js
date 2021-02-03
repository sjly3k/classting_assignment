import React from 'react';

const Form = ({
	submitFunction,
	className,
	children
              }) => {
	return (
		<form onSubmit={e => {
			e.preventDefault();
			submitFunction();
		}} className={className}>
			{children}
		</form>
	);
};

export default Form;