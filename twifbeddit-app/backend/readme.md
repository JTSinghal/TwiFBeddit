# Backend API

# /users

## GET
This will return information on a user. Currently this will succeed for all users, however in the future a user will need to be authenticated to see if they are blocked from getting a users info.
### Parameters
`username=username`
### Response
```json
{
    "profile_picture": "String (url)",
    "bio": "String",
    "following": "[String (topics)]",
    "followers": "Int",
    "profile_pictrue": "String",
    "username": "String"
}
```

## POST
### Accepts
```json
{
    "username": "String",
    "email": "String",
    "password": "String"
}
```
### Response
```json
{
    "profile_picture": "String (url)",
    "bio": "String",
    "following": "[String (usernames)]",
    "followers": "Int",
    "savedPosts": "[String (id)]",
    "username": "String",
    "email": "String"
}
```

## PATCH
### Accepts
### Parameters
`email=string&password=string&profile_picture=string&bio=string`
### Response
```json
{
    "profile_picture": "String (url)",
    "bio": "String",
    "following": "[String (usernames)]",
    "followers": "Int",
    "savedPosts": "[String (id)]",
    "_id":"5f7ce5a4e353ea00088cc337",
    "username": "String",
    "email": "String"
}
```
### Parameters
`usernameToFollow=string`
### Response
```json
{
    "following": "[String (usernames)]",
}
```
### Parameters
`usernameToUnfollow=string`
### Response
```json
{
    "following": "[String (usernames)]",
}
```

# /login

## GET
### Parameters
`[username|email]=string&password=string`
### Response
Set-Cookie Header, and user object like above

# /posts
## POST
### Accepts
```json
{   
    "title": "String",
    "anonymous": "Bool (optional, defaults false)",
    "topic": "String (optional, defaults to null, meaning 'all')",
    "post_type": "String (optional, one of ['text'], only type supported, defaults to text)",
    "text": "String"
}
```
### Response
```json
{
    "postId": "String (id)"
}
```

## GET
### Response
```json
{
    "posts": "[Post] (posts sorted by most recent, under topics followed by the user)" 
}
```

## GET
### Parameters
`topic=string`
### Accepts
```json
{
    "topic": "String (valid topic)"
}
```
### Response
```json
{
    "posts": "[Post] (posts under the topic)"
}
```
### Parameters
`author=string`
### Accepts
```json
{
    "author": "String (valid user/author)"
}
```
### Response
```json
{
    "posts": "[Post] (posts under the specified user that aren't anonymous)"
}
```

# /votes
## POST
### Parameters
`postId=string&action=[up|down|unup|undown]`
### Response
```json
{
    "userUpVoted": "boolean",
    "userDownVoted": "boolean",
    "numUp": "int",
    "numDown": "int"
}
```
### Errors
A common response is 409 Conflict, when for example, upvoting a post that was already upvoted. Regardless, the same json object will be returned, just without an update.

# /save
## POST
### Parameters
`postId=string[&unsave=true]`

If unsave is set to true, then a post then a previously saved post will be removed from the users saved posts set.
No error checking is done on postId to see if it is valid. This will only ever fail if the Cookie is invalid.
### Response
None

## GET
### Response
```json
{
    "posts": "[String (post ID)]"
}
```
