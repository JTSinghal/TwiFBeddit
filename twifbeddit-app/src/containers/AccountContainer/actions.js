import * as Constants from "./constants";

export function signInOrSignUp(object) {
	return {
		type: Constants.SIGN_IN_OR_SIGN_UP,
		object,
	};
}

export function followUser(payload) {
	return {
		type: Constants.FOLLOW_USER,
		payload,
	};
}

export function unfollowUser(payload) {
	return {
		type: Constants.UNFOLLOW_USER,
		payload,
	};
}