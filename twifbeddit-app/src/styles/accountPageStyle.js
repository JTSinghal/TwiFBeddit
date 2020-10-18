import styled from "styled-components";
import { Col, Row } from "styled-bootstrap-grid";

export const Page = styled(Col)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Content = styled(Col)`
	background-color: white;
	border: 1px grey solid;
	width: 750px;
`;

export const Header = styled(Row)``;

export const UpperHeaderRow = styled(Row)``;

export const ProfilePictureCol = styled(Col)``;

export const ProfilePicture = styled.img`
	float: left;
	width:  100px;
	height: 100px;
	object-fit: cover;
	border: 2px solid black;
	border-radius: 50%;
`;

export const FollowCol = styled(Col)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
`;
export const FollowText = styled.p`
	font-family: "Montserrat", sans-serif;
	font-size: 1.15rem;
	font-weight: 600;
`;
export const FollowNum = styled.p``;

export const FollowButton = styled.button`
	color: #3399FF;
	font-family: "Helvetica";
	font-size: 11pt;
	background-color: #ffffff;
	border: 1px solid;
	border-color: #3399FF;
	border-radius: 3px;
	width: 85px;
	height: 30px;
	top: 50px;
	left: 50px;
	cursor: hand;
`;

export const UsernameRow = styled(Row)``;

export const UsernameText = styled.p`
	font-family: "Montserrat", sans-serif;
	font-size: 1.15rem;
	font-weight: 600;
`;

export const BioRow = styled(Row)``;

export const BioText = styled.p``;

export const Posts = styled(Row)``;
