# Blackjack

[My Notes](notes.md)

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown - done
- [x] A concise and compelling elevator pitch - inshallah it is compelling
- [x] Description of key features - listed the main points of the application's functionality
- [x] Description of how you will use each technology - done
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references. - Included mock images of the login page and the game itself, plus an example of users' interactions with the server.

### Elevator pitch

Before the invention of the internet, before both world wars, before the Gilded Age, the Louisiana Purchase, the French Revolution, and the birth of America, the card game Vingt-et-un was created in France. The game has persisted over the last three centuries, coming to be known as Twenty-one to English-speaking audiences, and later as Blackjack. This application simulates the high-stakes casino classic with fake cash, and allows players to compete for the highest total winnings.

### Design

Login page:

![Login mock](blackjacklogin.PNG)

In-game view:

![Game mock](blackjackmock.PNG)

```mermaid
sequenceDiagram
    actor Player1
    actor Player2
    actor Player3
    actor Server
    Player1->>Server: Player1 wallet + $400
    Server->>Player2: Player1 wallet + $400
    Server->>Player3: Player1 wallet + $400
    Player3->>Server: Player3 wallet - $750
    Server->>Player1: Player3 wallet - $750
    Server->>Player2: Player3 wallet - $750
```

### Key features

- Secure login
- Starting wallet of 1000 (fake) dollars
- Ability to play blackjack against an automated dealer
- Official game rules and options
- Leaderboard to compare your total earnings to those of other players

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Basic structure of app. This includes the login page, the game, and the leaderboard.
- **CSS** - Styling to match the rough draft displayed in the mock design above.
- **React** - Login and gameplay functionality; which action the user takes.
- **Service** - Deck of cards API (https://deckofcardsapi.com/) that tracks cards used and displays cards in play.
- **DB/Login** - Receives player's earnings/losses after each game and updates their wallet.
- **WebSocket** - Display of other players' earnings in the leaderboard.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
