import React from "react";
import { useState } from "react";
import makeNetworkCall from "../util/makeNetworkCall";
import {
	Content,
	ContentCol,
	UserTopicRow,
	UserTopicText,
	TitleRow,
	TitleText,
	ImageRow,
	ImagePic,
	BodyRow,
	BodyText,
	VotesRow,
	VotesCol,
	UpvoteButton,
	DownvoteButton,
	SaveButton,
} from "../styles/postStyle";

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
		postId,
	} = props;

	const [curVote, setCurVote] = useState("");

	const vote = (voteType) => {
		if (voteType !== curVote) {
			//their first vote or switching vote
			console.log(voteType, postId);
			const response = makeNetworkCall({
				HTTPMethod: "post",
				path: "votes",
				params: {
					postId,
					action: voteType,
				},
			});
			setCurVote(voteType);
		} else {
			//undoing their current vote
			let unvoteType;
			if (voteType === "up") {
				unvoteType = "unup";
			} else {
				unvoteType = "undown";
			}
			console.log(unvoteType, postId);
			const response = makeNetworkCall({
				HTTPMethod: "post",
				path: "votes",
				params: {
					postId,
					action: unvoteType,
				},
			});
			setCurVote("");
		}
	};

	const savePost = () => {};

	return (
		<Content>
			<ContentCol col={12}>
				<UserTopicRow>
					<UserTopicText>u/{Username}</UserTopicText>
					<UserTopicText>r/{Topic}</UserTopicText>
				</UserTopicRow>
				<TitleRow>
					<TitleText>{Title}</TitleText>
				</TitleRow>
				<ImageRow>
					<ImagePic src={Image} />
				</ImageRow>
				<BodyRow>
					<BodyText>{Body}</BodyText>
				</BodyRow>
				<VotesRow>
					<VotesCol col={4}>
						<UpvoteButton onClick={() => vote("up")}>Upvote</UpvoteButton>
					</VotesCol>
					<VotesCol col={4}>
						<DownvoteButton onClick={() => vote("down")}>
							Downvote
						</DownvoteButton>
					</VotesCol>
					<VotesCol col={4}>
						<SaveButton>Save Post</SaveButton>
					</VotesCol>
				</VotesRow>
			</ContentCol>
		</Content>
	);
};

export default Post;
