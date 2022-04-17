# xkcd Plus

This website is for displaying xkcd comic strips.

[Open website](https://madam-xkcd-plus.herokuapp.com/)

[Backend readme](https://github.com/madam97/xkcd-plus-api#readme)

------------------------------

## Future features' implementation

### Voting comic strips

Task: In the future, we want to add voting to our application so users will be able to upvote or downvote comic strips (like on Reddit).

#### Backend

- We have to store the vote type, the voted comic's number and the user's id who voted.
- To get the user's id we have to add user authentication to the website. By connecting the vote to the user's id, we can prevent users to vote multiple times on the same comic.
- Also by allowing only logged users to vote, the voting system is a bit secured, for example we can ban users if needed

##### Database

###### Users table structure

| Column          | Type                  | Description |
| --------------- | --------------------- | ----------- |
| userId          | unsigned int          | The voter user's id |
| username        | string                | Required to login |
| password        | string                | Required to login |

###### Votes table structure

- comicNum and userId has to be unique, so no duplications will be saved (prevent users to vote multiple times on the same comic)
- we can save the vote create and update time, but it is not necessary at this time

| Column          | Type                  | Description |
| --------------- | --------------------- | ----------- |
| comicNum        | unsigned int          | The xkcd comic strip's number |
| userId          | unsigned int          | The voter user's id |
| type            | enum(-1, 1)           | Value can be 1 (if upvote) or -1 (if downvote) |

##### API endpoints

- see below the Body and Response data types
- we need to pass the JWT token through auth header to the endpoints that has 'y' in Token column, so we can identify the logged user

| Method  | Endpoint            | Token  | Body          | Response      | Description      |
| ------- | ------------------- | ------ | ------------- | ------------- | ---------------- |
| User authentication |
| POST    | /auth/register      |        | AuthData      |               | Logins the user |
| POST    | /auth/login         |        | AuthData      | AuthToken     | Logins the user |
| POST    | /auth/logout        | y      |               |               | If it is needed, deletes any data of the user (like JWT refresh token) |
| Voting |
| POST    | /comics/:num/vote   | y      | VoteType      | Comic         | Vote the given comic strip |
| PUT     | /comics/:num/vote   | y      | VoteType      | Comic         | Updates the user's vote on the given comic strip |
| DELETE  | /comics/:num/vote    | y      |               | Comic         | Deletes the user's vote on the given comic strip |

##### Body and response data types

```ts
interface AuthData {
  username: string
  password: string
}

interface AuthToken {
  // JWT token
  token: string
}

interface VoteType {
  // upvote or downvote
  type: 1 | -1
}

interface Comic {
  // the sum of vote's types (see Other ideas below)
  voteSum: number,

  // the logged in user's vote if they jave  oted already
  voteOfUser: VoteType | null

  // other properties, see backend readme above
}
```

#### Frontend

##### User authentication

- user can see a sign up link and login button in the header
  - sign up link redirects to registration form
    - use **POST /auth/register** API endpoint
  - login button shows a dropdown of login form
    - use **POST /auth/login** API endpoint
- after login, sign up link and login button hides, and a logout button appears in the header
  - logout button restores the header to its original state
    - use **POST /auth/logout** API endpoint

##### Voting

| Arrow     | Value | Active color | Inactive Color |
| --------- | ----- | ------------ | -------------- |
| upvote    | 1     | green        | gray           |
| downvote  | -1    | red          | gray           |

- displaying vote
  - if arrow's value equals to *Comic.voteOfUser.type*, than arrow is active
  - hovering on the arrow its color changes depending on its status (active upvote: green -> gray, inactive upvote: gray -> green)
  - show the votes sum between the two arrows (text can be black default, but red if its a negative value)
  - use **GET /comics/random** and **GET /comics/:num** endpoints
- voting
  - if both arrows are inactive, clicking on one will save a new vote with the clicked arrow's value
    - use **POST /comics/:num/vote**
  - if one arrow is active, clicking on the inactive will update the vote with the clicked arrow's value
    - use **PUT /comics/:num/vote**
  - if one arrow is active, clicking on it will delete the vote
    - use **DELETE /comics/:num/vote**

#### Other ideas

- should cache the voteSum value of every comic
  - after voting the backend should recalculate its value by summing the comics' vote types (1 / -1)
  - this calculation should run every 5 minutes, because calculation after every voting would overload the server, so it would not be a problem if multiple users voting at the same time
  - if we use cache, the user should see *( Comic.voteSum - Comic.voteOfUser.type )* value, so changing their vote would change the votes' sum besides the arrows' color
- for better user experience
  - should use websockets to update the votes' sum after its recalculation
  - if the API would fail while voting, a modal should come up with an error message and a "Try again" button and a "Close" button
    - the "Try again" button sends the same vote again