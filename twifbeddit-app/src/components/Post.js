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
import { Alert } from "rsuite";
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
		Url,
		currentPost,
	} = props;

	const [curVote, setCurVote] = useState(""),
		cookie = useSelector((state) => state.global.cookie),
		[loading, setLoading] = useState(false),
		dispatch = useDispatch(),
		savedPostIds = useSelector((state) => state.account.savedPostIds);

	const vote = async (command, e) => {
		e.stopPropagation();
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
			const error = resp.error + " ";
			if (!error.includes("409")) {
				setCurVote(oldCurVote);
				Alert.error("Something went wrong when voting on this post.", 4000);
			}
		}
		setLoading(false);
	};

	const switchToAuthorAccount = (e) => {
		e.stopPropagation();
		if (Username) {
			dispatch(navigationActions.setUsernameForAccountPage(Username));
			dispatch(navigationActions.changeCurrentPage("Account"));
		}
	};

	const switchToTopicPage = (e) => {
		e.stopPropagation();
		dispatch(navigationActions.storeSearchRequest(Topic));
		dispatch(navigationActions.changeCurrentPage("SearchResults"));
	};

	const savePost = async (e) => {
		e.stopPropagation();
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

		if (resp.error) {
			Alert.error("Something went wrong saving post.");
		}

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
						u/{Username ? Username : "Anonymous"}
					</UserTopicText>
					<UserTopicText onClick={(e) => switchToTopicPage(e)}>
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
				<BodyRow>
					<BodyText></BodyText>
				</BodyRow>
				{Url ? (
					<a href={Url}>{Url}</a>
				) : null}
				<VotesRow>
					<UpvoteButton disabled={loading} onClick={(e) => vote("up", e)}>
						{curVote === "up" ? "undo UpVote" : "Upvote"}
					</UpvoteButton>
					<DownvoteButton disabled={loading} onClick={(e) => vote("down", e)}>
						{curVote === "down" ? "undo Downvote" : "Downvote"}
					</DownvoteButton>
					<SaveButton disabled={loading} onClick={(e) => savePost(e)}>
						{savedPostIds.includes(PostId) ? "Unsave Post" : "Save Post"}
					</SaveButton>
				</VotesRow>
			</ContentCol>
		</Content>
	);
};

export default Post;
