import React from "react";
import { Content } from "../styles/postStyle";

const Post = (props) => {
	const {
		Username,
		Title,
		Topic,
		Image,
		Body,
		Upvotes,
		Downvotes,
		userVote,
	} = props;

	return <Content>Post</Content>;
};

export default Post;
