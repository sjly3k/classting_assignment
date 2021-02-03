import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {signIn, signUp} from "../store/modules/auth";
import styled from "styled-components"
import Input from "./Input";
import Button from "./Button";
import {getStorage} from "../utils/localStorage";

const Authentication = (props) => {

	const { authError } = props;
	const [state, setState] = useState({
		email : '',
		password : ''
	})
	const [action, setAction] = useState('signIn')

	const handleInputChange = (e) => {
		const value = e.target.value;
		const name = e.target.name;

		setState({
			...state,
			[name]: value
		})
	}

	const handleSignIn = e => {
		e.preventDefault();
		props.signIn(state);
	};

	const handleSignUp = e => {
		e.preventDefault();
		props.signUp(state);
	}

	if (getStorage("USER_INFO")) return <Redirect to={"/"}/>
	return (
		<AuthContainer>
			<AuthHeader>
				<h1>Voting Site</h1>
			</AuthHeader>
			<AuthContent>
				{
					action === "signIn" ? (
						<React.Fragment>
							<div>
								처음이신가요?
								{' '}
								<span onClick={() => setAction("signUp")}>회원가입 하기</span>
							</div>
							<AuthLayout>
								<form onSubmit={handleSignIn}>
									<Input
										type="email"
										name={"email"}
										value={state.email}
										placeholder={"Email"}
										onChange={handleInputChange} />
									<Input
										type="password"
										name={"password"}
										value={state.password}
										placeholder={"Password"}
										onChange={handleInputChange} />
									<ButtonWrapper>
										<Button value={"Sign In"}/>
									</ButtonWrapper>
									<ErrorText>
										{authError ? <p>{authError}</p> : null}
									</ErrorText>
									<InfoWrapper>
										<h3>- Use this -</h3>
										<p>user1@google.com</p>
										<p>123456</p>
									</InfoWrapper>
								</form>
							</AuthLayout>
						</React.Fragment>
					) : (
						<React.Fragment>
							<div>
								이미 회원가입을 하셨나요?
								{' '}
								<span onClick={() => setAction("signIn")}>로그인 하기</span>
							</div>
							<AuthLayout>
								<form onSubmit={handleSignUp}>
									<Input
										type="email"
										name={"email"}
										value={state.email}
										placeholder={"Email"}
										onChange={handleInputChange} />
									<Input
										type="password"
										name={"password"}
										value={state.password}
										placeholder={"Password"}
										onChange={handleInputChange} />
									<ButtonWrapper>
										<Button value={"Sign Up"}/>
									</ButtonWrapper>
									<ErrorText>
										{authError ? <p>{authError}</p> : null}
									</ErrorText>
								</form>
							</AuthLayout>
						</React.Fragment>
					)
				}
			</AuthContent>
		</AuthContainer>
	);
};

const mapStateToProps = state => {
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		signIn: creds => dispatch(signIn(creds)),
		signUp: newUser => dispatch(signUp(newUser)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Authentication);

const AuthContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
`

const AuthLayout = styled.div`
	position: relative;
	width: 320px;
`

const AuthContent = styled.div`
	line-height: 1.71428571;
    text-align: center;
    font-size: .875rem;
    
    form {
    	padding-top : 10px;
    	padding-bottom : 20px;
    }
    input:not(:last-child) {
    	margin-bottom: 10px;
    }
    span {
    	color: #3282f6;
	    -webkit-transition: background-color 1s cubic-bezier(.19,1,.22,1);
	    transition: background-color 1s cubic-bezier(.19,1,.22,1);
	    cursor: pointer;
    }
`

const ButtonWrapper = styled.div`
 	padding-bottom: 20px;
     button {
        background: linear-gradient(270deg,#8a34ff,#00c0ff);
    	height: 40px;
    	margin : 0;
    }
`;

const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	h3 {
	    font-size: 1rem;
	    font-weight: 700;
		margin-bottom: 10px;
	}
	p {
		margin-bottom: 10px;
	}
`
const ErrorText = styled.div`
`

const AuthHeader = styled.header`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
    padding-bottom: 0.5rem;
	h1 {
	    font-size: 1.75rem;
	    font-weight: 700;
	    word-break: keep-all;
	    line-height: 1.67;
	    letter-spacing: -1px;
	    color: #2c2c44;
    }
`;
