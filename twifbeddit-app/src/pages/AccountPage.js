import React, {useState} from "react";
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
} from "../styles/accountPageStyle";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import * as accountActions from "../containers/AccountContainer/actions";

const AccountPage = () => {
	const { username, profile_pictrue, bio, following, followers } = useSelector(
		(state) => state.account
	),
		[isCurUser, setIsCurUser] = useState(false),
		[isFollowing, setIsFollowing] = useState(false),
		dispatch = useDispatch();

	const followOrUnfollow = (type) => {
		if (type === "Unfollow") {
			dispatch(accountActions.unfollowUser(username));
			setIsFollowing(false);
		} else {
			dispatch(accountActions.followUser(username));
			setIsFollowing(true);
		}
	}

	return (
		<Page col={12}>
			<Content>
				<UpperHeaderRow>
					<ProfilePictureCol col={3}>
						<ProfilePicture alt="profilePicture" src={profile_pictrue} />
					</ProfilePictureCol>
					<FollowCol col={4} offset={1}>
						<FollowText>Followers</FollowText>
						<FollowNum> {followers} </FollowNum>
						{
							isCurUser ? null : 
							(isFollowing ? <FollowButton onClick={ () => {followOrUnfollow("Unfollow")} }>Unfollow</FollowButton> : 
							<FollowButton onClick={ () => {followOrUnfollow("Follow")} }>Follow</FollowButton>)
						}
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
					<BioText>Purdue CS student</BioText>
				</BioRow>
				<Post
					Username={username}
					Title="Mac is Great"
					Topic="Music"
					Body="Faces is a great project!!!!!!"
					Upvotes="69"
					Downvotes="69"
					userVote="upvote"
					Image="https://www.rollingstone.com/wp-content/uploads/2018/11/mac-miller-left-behind.jpg?resize=1800,1200&w=450"
				></Post>
			</Content>
		</Page>
	);
};

export default AccountPage;
