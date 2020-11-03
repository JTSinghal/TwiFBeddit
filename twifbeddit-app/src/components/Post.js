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
	UpvoteButton,
	DownvoteButton,
	SaveButton,
} from "../styles/postStyle";
import { useSelector, useDispatch } from "react-redux";
import * as navigationActions from "../containers/NavigationContainer/actions";
import * as accountActions from "../containers/AccountContainer/actions";

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
		PostId,
		Post,
		currentPost,
	} = props;

	const [curVote, setCurVote] = useState(""),
		cookie = useSelector((state) => state.global.cookie),
		[loading, setLoading] = useState(false),
		dispatch = useDispatch(),
		savedPostIds = useSelector((state) => state.account.savedPostIds);

	const vote = async (command) => {
		const voteType = curVote === command ? "un" + command : command;
		const oldCurVote = curVote;
		setCurVote(voteType);
		setLoading(true);
		const resp = await makeNetworkCall({
			HTTPmethod: "post",
			path: "votes",
			params: {
				postId: PostId,
				action: voteType,
			},
			cookie,
		});
		if (resp.error) {
			setCurVote(oldCurVote);
		}
		setLoading(false);
	};

	const switchToAuthorAccount = (e) => {
		e.stopPropagation();
		dispatch(navigationActions.setUsernameForAccountPage(Username));
		dispatch(navigationActions.changeCurrentPage("Account"));
	};

	const switchToTopicPage = () => {
		dispatch(navigationActions.storeSearchRequest(Topic));
		dispatch(navigationActions.changeCurrentPage("SearchResults"));
	}

	const savePost = async () => {
		setLoading(true);
		let params;
		let saved = savedPostIds.includes(PostId);
		if (saved) {
			params = {
				postId: PostId,
				unsave: true,
			};
			dispatch(accountActions.removeSavePost(PostId));
		} else {
			params = {
				postId: PostId,
			};
			dispatch(accountActions.addSavePost(Post));
		}
		const resp = await makeNetworkCall({
			HTTPmethod: "post",
			path: "save",
			cookie,
			params,
		});

		setLoading(false);
	};

	const viewPost = () => {
		if (currentPost) {
			return;
		}
		dispatch(navigationActions.changeCurrentPost(Post));
		dispatch(navigationActions.changeCurrentPage("ViewPost"));
	};

	return (
		<Content currentPost={currentPost}>
			<ContentCol col={12} onClick={() => viewPost()}>
				<UserTopicRow>
					<UserTopicText onClick={(e) => switchToAuthorAccount(e)}>
						u/{Username}
					</UserTopicText>
					<UserTopicText onClick={() => switchToTopicPage()}>
						r/{Topic}
					</UserTopicText>
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
					<UpvoteButton disabled={loading} onClick={() => vote("up")}>
						{curVote === "up" ? "undo UpVote" : "Upvote"}
					</UpvoteButton>
					<DownvoteButton disabled={loading} onClick={() => vote("down")}>
						{curVote === "down" ? "undo Downvote" : "Downvote"}
					</DownvoteButton>
					<SaveButton disabled={loading} onClick={() => savePost()}>
						{savedPostIds.includes(PostId) ? "Unsave Post" : "Save Post"}
					</SaveButton>
				</VotesRow>
			</ContentCol>
		</Content>
	);
};

export default Post;
