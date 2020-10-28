import React from "react";
import { Content, ContentCol, UserTopicRow, UserTopicText, TitleRow, TitleText, ImageRow, ImagePic, BodyRow, BodyText, VotesRow, VotesCol, UpvoteButton, DownvoteButton, SaveButton } from "../styles/postStyle";

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

	return <Content>
		<ContentCol col={12}>
			<UserTopicRow>
				<UserTopicText>u/{Username}</UserTopicText>
				<UserTopicText>r/{Topic}</UserTopicText>
			</UserTopicRow>
			<TitleRow>
				<TitleText>{Title}</TitleText>
			</TitleRow>
				<ImageRow>
					<ImagePic
						src={Image}
					/>
			</ImageRow>
			<BodyRow>
				<BodyText>{Body}</BodyText>
			</BodyRow>
			<VotesRow>
				<VotesCol col={4}>
					<UpvoteButton>Upvote</UpvoteButton>
				</VotesCol>
				<VotesCol col={4}>
					<DownvoteButton>Downvote</DownvoteButton>
				</VotesCol>
				<VotesCol col={4}>
					<SaveButton>Save Post</SaveButton>
				</VotesCol>
			</VotesRow>
		</ContentCol>
	</Content>;
};

export default Post;
