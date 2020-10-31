import React, { useEffect, useState } from "react";
import {
	Page,
	Content,
	UpperHeaderRow,
	ProfilePictureCol,
	ProfilePicture,
	FollowCol,
	FollowText,
	FollowNum,
	FollowButton,
	UsernameRow,
	UsernameText,
	BioRow,
	BioText,
	LogoutRow,
	LogoutButton,
} from "../styles/accountPageStyle";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import * as accountActions from "../containers/AccountContainer/actions";
import makeNetworkCall from "../util/makeNetworkCall";
import * as GlobalActions from "../containers/GlobalContainer/actions";
import _ from "lodash";

const AccountPage = () => {
	const { username, profile_picture, bio, following, followers } = useSelector(
			(state) => state.account
		),
		dispatch = useDispatch(),
		posts = useSelector((state) => state.global.posts),
		[isCurUser, setIsCurUser] = useState(false),
		[isFollowing, setIsFollowing] = useState(false);

	useEffect(() => {
		const getPosts = async () => {
			if (username) {
				const resp = await makeNetworkCall({
					HTTPmethod: "get",
					path: "posts",
					params: {
						author: username,
					},
				});
				dispatch(GlobalActions.setPosts(resp.posts));
			}
		};
		getPosts();
	}, [username]);

	const followOrUnfollow = (type) => {
		if (type === "Unfollow") {
			dispatch(accountActions.unfollowUser(username));
			setIsFollowing(false);
		} else {
			dispatch(accountActions.followUser(username));
			setIsFollowing(true);
		}
	};

	return (
		<Page col={12}>
			<Content>
				<UpperHeaderRow>
					<ProfilePictureCol col={3}>
						<ProfilePicture alt="profilePicture" src={profile_picture} />
					</ProfilePictureCol>
					<FollowCol col={4} offset={1}>
						<FollowText>Followers</FollowText>
						<FollowNum> {followers} </FollowNum>
						{isCurUser ? null : isFollowing ? (
							<FollowButton
								onClick={() => {
									followOrUnfollow("Unfollow");
								}}
							>
								Unfollow
							</FollowButton>
						) : (
							<FollowButton
								onClick={() => {
									followOrUnfollow("Follow");
								}}
							>
								Follow
							</FollowButton>
						)}
					</FollowCol>
					<FollowCol col={4}>
						<FollowText>Following</FollowText>
						<FollowNum> {following.length} </FollowNum>
					</FollowCol>
				</UpperHeaderRow>
				<UsernameRow>
					<UsernameText>{username}</UsernameText>
				</UsernameRow>
				<BioRow>
					<BioText>{bio}</BioText>
				</BioRow>
				{_.map(posts, (post) => {
					return (
						<Post
							Username={post.author}
							Title={post.title}
							Topic={post.topic}
							Body={post.text}
							Upvotes={post.upvotes}
							Downvotes={post.downvotes}
							Image={post.image_url}
						></Post>
					);
				})}
			</Content>
		</Page>
	);
};

export default AccountPage;
