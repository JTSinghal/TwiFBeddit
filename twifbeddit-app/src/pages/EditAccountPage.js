import React, { useState } from "react";
import { Col, Row } from "styled-bootstrap-grid";
import {
	Content,
	MyInput,
	MyControlLabel,
	Title,
} from "../styles/editAccountPageStyle";
import { Form, FormGroup, FormControl, ButtonToolbar, Button } from "rsuite";
import { useSelector } from "react-redux";
import uploadPicture from "../util/uploadPicture";

const EditAccountPage = () => {
	const [email, setEmail] = useState(""),
		[password, setPassword] = useState(""),
		[confirmPassword, setConfirmPassword] = useState(""),
		[bio, setBio] = useState(""),
		username = useSelector((state) => state.account.username),
		storeEmail = useSelector((state) => state.account.email),
		[profPic, setProfPic] = useState("");

	const validateEmail = (value) => {
		const error = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			value
		)
			? ""
			: "You must enter a valid email address";
		// setEmailError(error);
		return error;
	};

	const validatePassword = (password, confirmPassword) => {
		if (password.length < 8 || !/[A-Z]/.test(password)) {
			return "Password must have atleast 8 characters and one upper case letter";
		}
		if (password != confirmPassword) {
			return "Passwords do not match";
		}
		return null;
	};

	const validateBio = (bio) => {
		return bio.length <= 500 ? "" : "Bio must be below 500 characters";
	};

	const picChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// event.persist();
		setProfPic(event.target.files[0]);
	};

	const Submit = async (e) => {
		e.preventDefault();
		console.log(profPic);
		uploadPicture(profPic, "profile");

		const emailValidationError = validateEmail(email);
		const passwordValidationError = validatePassword(password, confirmPassword);
		const bioValidationError = validateBio(bio);
		// if (emailValidationError) {
		// 	alert(emailValidationError);
		// } else if (passwordValidationError) {
		// 	alert(passwordValidationError);
		// } else if (bioValidationError) {
		// 	alert(bioValidationError);
		// } else {
		// 	console.log("bitch");
		// 	console.log(profPic);
		// 	console.log(profPic.type);
		// 	if (profPic) {
		// 		uploadPicture(profPic, "profile");
		// 	}
		// 	//data is valid, send to db
		// }

		// const newUserDetails = {
		// 	user: {
		// 		password: password,
		// 		subscribed: subscribe,
		// 	},
		// };
		// //setSubmitResult(result);
		// //setSubmitted(true);
		// const resp = await makeNetworkCall({
		// 	HTTPmethod: "post",
		// 	path: "users",
		// 	data: {
		// 		email,
		// 		username,
		// 		password,
		// 	},
		// });
		// if (resp.error) {
		// 	console.log("Error Signing Up");
		// } else {
		// 	dispatch(accountActions.signInOrSignUp(resp));
		// 	changeActiveScreen("LandingPage");
		// }
	};
	return (
		<Col col={12}>
			<Row>
				<Col col={12}>
					<Title>Edit Profile</Title>
				</Col>
			</Row>
			<Row>
				<Content col={8} offset={2}>
					<Form fluid>
						<FormGroup>
							<MyControlLabel>Username</MyControlLabel>
							<FormControl name="username" value={username} disabled={true} />
						</FormGroup>
						<FormGroup>
							<MyControlLabel>Profile Picture</MyControlLabel>
							{/* <FormControl name="profPic" type="file" onChange={picChange} /> */}
							<input
								type="file"
								accept="image/png"
								onChange={picChange}
							></input>
						</FormGroup>
						<FormGroup>
							<MyControlLabel>Email</MyControlLabel>
							<FormControl
								name="email"
								onChange={(e) => {
									setEmail(e);
								}}
								type="email"
								placeholder={storeEmail}
							/>
						</FormGroup>
						<FormGroup>
							<MyControlLabel>New Password</MyControlLabel>
							<FormControl
								name="Password"
								onChange={(e) => setPassword(e)}
								type="password"
							/>
						</FormGroup>
						<FormGroup>
							<MyControlLabel>Confirm New Password</MyControlLabel>
							<FormControl
								name="confirmPassword"
								onChange={(e) => setConfirmPassword(e)}
								type="password"
							/>
						</FormGroup>
						<FormGroup>
							<MyControlLabel>Bio</MyControlLabel>
							<FormControl
								rows={5}
								name="Bio"
								value={bio}
								onChange={(e) => setBio(e)}
								componentClass="textarea"
								placeholder="Type Bio Here"
							/>
						</FormGroup>
						<FormGroup>
							<ButtonToolbar>
								<Button appearance="primary" onClick={(e) => Submit(e)}>
									Save
								</Button>
							</ButtonToolbar>
						</FormGroup>
					</Form>
				</Content>
			</Row>
		</Col>
	);
};

export default EditAccountPage;
