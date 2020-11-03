import React, { useState, useEffect } from "react";

import { Page, Content, FollowButton } from "../styles/accountPageStyle";
import Post from "../components/Post.js";
import makeNetworkCall from "../util/makeNetworkCall";
import * as accountActions from "../containers/AccountContainer/actions";
import * as navigationActions from "../containers/NavigationContainer/actions";
import { useDispatch, useSelector } from "react-redux";

export default function SearchResults() {
	const currentAccount = useSelector((state) => state.account);
	const searchRequest = useSelector((state) => state.navigation.searchRequest);
	const cookie = useSelector((state) => state.global.cookie);
	const dispatch = useDispatch();

	const [posts, setPosts] = useState([]);
	const [isFollowing, setIsFollowing] = useState()

	const setInitialFollowState = () => {
		if (currentAccount.username){
			if (currentAccount.followed_topics.includes(searchRequest)){
				setIsFollowing(true);
			}else{
				setIsFollowing(false);
			}
		}
	}

	const followOrUnfollowTopic = (type) => {
		const topic = searchRequest;
		if (currentAccount.username === "") {
			dispatch(navigationActions.changeCurrentPage("SignUp"));
			return;
		}
		let params = {};
		if (type === "Unfollow") {
			dispatch(accountActions.unfollowTopic(searchRequest));
			setIsFollowing(false);
			params = {
				topicToUnfollow: searchRequest,
			};
		} else {
			dispatch(accountActions.followTopic(searchRequest));
			setIsFollowing(true);
			params = {
				topicToFollow: searchRequest,
			};
		}
		makeNetworkCall({
			HTTPmethod: "patch",
			path: "users",
			params,
			cookie,
		});
	}

	const getPosts = async () => {
		setInitialFollowState();

		const topic = searchRequest;
		const resp = await makeNetworkCall({
			HTTPmethod: "get",
			path: "posts",
			params: {
				topic: topic,
			},
		});
		if (resp.error) {
			console.log("Error receving posts");
		} else {
			//Convert list of JSON post objects into array
			var postsArray = [];
			for (var i = 0; i < resp.posts.length; i++) {
				var obj = resp.posts[i];
				console.log(obj);
				postsArray.push(obj);
			}
			/*this.setState({
        posts: postsArray,
      })*/
			console.log(postsArray);
			setPosts(postsArray);
		}
	};
	//getPosts()
	useEffect(() => {
		async function syncGetPosts() {
			await getPosts();
		}
		syncGetPosts();
	}, []);

	return (
		<Page col={12}>
			<Content>
					{isFollowing ? (
					<FollowButton
						onClick={() => {
							followOrUnfollowTopic("Unfollow");
						}}
					>
						Unfollow
					</FollowButton>
				) : (
					<FollowButton
						onClick={() => {
							followOrUnfollowTopic("Follow");
						}}
					>
						Follow
					</FollowButton>
				)}
				{posts.map(function (post) {
					return (
						<Post
							Username={post.author}
							Title={post.title}
							Topic={post.topic}
							Body={post.text}
							Upvotes={post.upvotes}
							Downvotes={post.downvotes}
							userVote="upvote"
							Image={post.image_url}
							PostId={post._id}
							Post={post}
						></Post>
					);
				})}
			</Content>
		</Page>
	);
}
