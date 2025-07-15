# API Documentation

## Project Overview

This is a Vue.js 3 application for board management (similar to Trello) with authentication features. It uses Vue Router for navigation, Vuex for state management, and Axios for HTTP requests.

## Table of Contents

1. [Application Structure](#application-structure)
2. [Routing](#routing)
3. [State Management (Vuex)](#state-management-vuex)
4. [Services](#services)
5. [Components](#components)
6. [Pages](#pages)
7. [Plugins](#plugins)
8. [Usage Examples](#usage-examples)

---

## Application Structure

### Entry Point: `src/main.js`

The main application entry point that sets up the Vue app with plugins and stores.

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import SettingAxios from "./plugins/axios";
import router from "./router/index";
import VuexStore from "./store/index";

SettingAxios(VuexStore);

createApp(App)
  .use(VuexStore)
  .use(router)
  .mount("#app");
```

### Main App Component: `src/App.vue`

The root component that provides the application layout.

**Template:**
- Renders `TheNavigation` component
- Provides a main container with `router-view`

**Components:**
- `TheNavigation`: Main navigation component

---

## Routing

### Router Configuration: `src/router/index.js`

Manages application routing with authentication guards.

#### Routes

| Route | Component | Authentication Required | Description |
|-------|-----------|------------------------|-------------|
| `/` | - | - | Redirects to `/auth` |
| `/main` | Main.vue | Yes | Main dashboard with boards |
| `/board/:id` | Board.vue | Yes | Individual board view |
| `/profile` | Profile.vue | Yes | User profile page |
| `/auth` | Auth.vue | No | Authentication page |
| `/:notFound(.*)` | NotFound.vue | No | 404 page |

#### Authentication Guard

The router includes a `beforeEach` guard that:
- Checks for authentication token in localStorage
- Redirects unauthenticated users to `/auth` for protected routes
- Redirects authenticated users to `/main` when accessing `/auth`

**Usage Example:**
```javascript
// Navigate to a specific board
this.$router.push({ name: 'board', params: { id: 'board-id' } });

// Navigate to main page
this.$router.push('/main');
```

---

## State Management (Vuex)

### Store Structure: `src/store/index.js`

The main Vuex store combines two modules:
- `auth`: Authentication state management
- `boards`: Board data management

### Auth Module: `src/store/auth/`

#### State (`state.js`)
```javascript
{
  token: String | null,    // JWT token from localStorage
  userId: String | null    // User ID from localStorage
}
```

#### Actions (`actions.js`)

##### `login(context, payload)`
Authenticates a user with the API.

**Parameters:**
- `payload`: Object containing `login` and `password`

**Usage:**
```javascript
await this.$store.dispatch('login', {
  login: 'username',
  password: 'password'
});
```

##### `logout(context)`
Logs out the current user and clears authentication data.

**Usage:**
```javascript
this.$store.dispatch('logout');
```

##### `signUp(context, user)`
Registers a new user.

**Parameters:**
- `user`: Object containing user registration data

**Usage:**
```javascript
await this.$store.dispatch('signUp', {
  username: 'newuser',
  password: 'password',
  email: 'user@example.com'
});
```

#### Mutations (`mutations.js`)

##### `login(state, { token, id })`
Sets authentication state upon successful login.

##### `logout(state)`
Clears authentication state.

#### Getters (`getters.js`)

##### `isAuth(state)`
Returns boolean indicating if user is authenticated.

**Usage:**
```javascript
computed: {
  ...mapGetters(['isAuth'])
}
```

### Boards Module: `src/store/boards/`

#### State (`state.js`)
```javascript
{
  boards: Array,  // List of all boards
  board: Array,   // Current board data
  users: Array    // Users associated with boards
}
```

#### Actions (`actions.js`)

##### `fetchBoards(context)`
Retrieves all boards from the API.

**Usage:**
```javascript
this.$store.dispatch('fetchBoards');
```

##### `fetchBoard(context, id)`
Retrieves a specific board by ID.

**Parameters:**
- `id`: String - Board ID

**Usage:**
```javascript
this.$store.dispatch('fetchBoard', 'board-id');
```

#### Mutations (`mutations.js`)

##### `setBoards(state, boards)`
Sets the boards array in state.

##### `setBoard(state, board)`
Sets the current board in state.

#### Getters (`getters.js`)

##### `getBoards(state)`
Returns all boards.

##### `getBoard(state)`
Returns the current board.

##### `getUsers(state)`
Returns users array.

**Usage:**
```javascript
computed: {
  ...mapGetters(['getBoards', 'getBoard', 'getUsers'])
}
```

---

## Services

### API Service: `src/services/service.js`

Handles API communication with the backend.

#### Methods

##### `getBoards()`
Fetches all boards from the API.

**Returns:** Promise resolving to boards array

**Usage:**
```javascript
import service from '@/services/service';

const boards = await service.getBoards();
```

##### `getBoard(id)`
Fetches a specific board by ID.

**Parameters:**
- `id`: String - Board ID

**Returns:** Promise resolving to board object

**Usage:**
```javascript
const board = await service.getBoard('board-id');
```

##### `getUsersForBoard(id)`
Fetches users associated with a specific board.

**Parameters:**
- `id`: String - Board ID

**Returns:** Promise resolving to users array

**Usage:**
```javascript
const users = await service.getUsersForBoard('board-id');
```

##### `updateList({ id, boardListName })`
Updates a board list name.

**Parameters:**
- `id`: String - List ID
- `boardListName`: String - New list name

**Returns:** Promise resolving to API response

**Usage:**
```javascript
await service.updateList({
  id: 'list-id',
  boardListName: 'New List Name'
});
```

---

## Components

### Navigation Components

#### TheNavigation: `src/components/nav/TheNavigation.vue`

Main navigation component with authentication-based visibility.

**Props:** None

**Data:** None

**Computed Properties:**
- `isAuth`: Boolean (from Vuex getter)

**Methods:**
- `logoutUser()`: Handles user logout and navigation

**Template Features:**
- Conditional rendering based on authentication state
- Navigation links to boards and profile
- Logout functionality

**Usage:**
```vue
<the-navigation></the-navigation>
```

#### NotFound: `src/components/nav/NotFound.vue`

Simple 404 error page component.

**Props:** None

**Usage:**
```vue
<not-found></not-found>
```

### Board Components

#### BoardList: `src/components/BoardList.vue`

Displays a board list with cards and editable list name.

**Props:**
- `boardListName`: String - Name of the board list
- `id`: String - List ID
- `cards`: Array - Cards in the list

**Data:**
- `textareaSize`: Number - Textarea rows for editing
- `listHeader`: String - Current list name
- `listNameIsChange`: Boolean - Edit mode state

**Methods:**
- `changeListName()`: Saves list name changes
- `focusInput()`: Enters edit mode for list name

**Template Features:**
- Inline editing of list names
- Card display
- Add card button

**Usage:**
```vue
<board-list
  :boardListName="list.boardListName"
  :id="list._id"
  :cards="list.cardId"
></board-list>
```

#### Card: `src/components/Card.vue`

Displays individual cards within board lists.

**Props:**
- `cardName`: String - Name of the card

**Template Features:**
- Simple card display with styling

**Usage:**
```vue
<card :cardName="card.cardName"></card>
```

---

## Pages

### Auth: `src/pages/Auth.vue`

Authentication page for user login.

**Data:**
- `name`: String - Username input
- `password`: String - Password input

**Methods:**
- `onLogin()`: Handles login form submission

**Template Features:**
- Login form with username and password fields
- Form validation and submission

**Usage:**
Automatically routed to `/auth` for unauthenticated users.

### Main: `src/pages/Main.vue`

Main dashboard displaying all user boards.

**Computed Properties:**
- `getBoards`: Array (from Vuex getter)

**Methods:**
- `fetchBoards()`: Loads boards on component mount

**Template Features:**
- Grid display of boards
- Navigation to individual boards
- "Create board" placeholder

**Usage:**
Accessible at `/main` for authenticated users.

### Board: `src/pages/Board.vue`

Individual board view with lists and cards.

**Props:**
- `id`: String - Board ID from route params

**Computed Properties:**
- `getBoard`: Object (from Vuex getter)
- `getUsers`: Array (from Vuex getter)

**Methods:**
- `fetchBoard(id)`: Loads board data on component mount

**Template Features:**
- Board name display
- Users list
- Board lists with cards
- Interactive list management

**Usage:**
Accessible at `/board/:id` for authenticated users.

### Profile: `src/pages/Profile.vue`

User profile page (basic implementation).

**Template Features:**
- User avatar placeholder
- User name display
- Settings placeholder

**Usage:**
Accessible at `/profile` for authenticated users.

---

## Plugins

### Axios Plugin: `src/plugins/axios.js`

Configures Axios with authentication interceptors.

#### Configuration

**Base URL:** `http://localhost:3000/`

**Request Interceptor:**
- Automatically adds JWT token to requests
- Uses token from Vuex store

#### Functions

##### `SettingAxios(store)`
Initializes Axios with store integration.

**Parameters:**
- `store`: Vuex store instance

**Usage:**
```javascript
import SettingAxios from '@/plugins/axios';
import store from '@/store';

SettingAxios(store);
```

---

## Usage Examples

### Complete Authentication Flow

```javascript
// 1. User login
await this.$store.dispatch('login', {
  login: 'username',
  password: 'password'
});

// 2. Check authentication status
if (this.$store.getters.isAuth) {
  // User is authenticated
  this.$router.push('/main');
}

// 3. Logout
this.$store.dispatch('logout');
this.$router.push('/auth');
```

### Board Management

```javascript
// 1. Load all boards
await this.$store.dispatch('fetchBoards');
const boards = this.$store.getters.getBoards;

// 2. Load specific board
await this.$store.dispatch('fetchBoard', 'board-id');
const board = this.$store.getters.getBoard;

// 3. Update list name
await this.$store.dispatch('updateList', {
  id: 'list-id',
  boardListName: 'New Name'
});
```

### Component Integration

```vue
<template>
  <div>
    <!-- Navigation -->
    <the-navigation></the-navigation>
    
    <!-- Board display -->
    <board-list
      v-for="list in board.boardListId"
      :key="list._id"
      :boardListName="list.boardListName"
      :id="list._id"
      :cards="list.cardId"
    ></board-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TheNavigation from '@/components/nav/TheNavigation.vue';
import BoardList from '@/components/BoardList.vue';

export default {
  components: {
    TheNavigation,
    BoardList
  },
  computed: {
    ...mapGetters(['getBoard', 'isAuth'])
  },
  methods: {
    ...mapActions(['fetchBoard'])
  },
  mounted() {
    if (this.isAuth) {
      this.fetchBoard(this.$route.params.id);
    }
  }
};
</script>
```

### Error Handling

```javascript
// Service error handling
try {
  const boards = await service.getBoards();
} catch (error) {
  console.error('Failed to fetch boards:', error);
  // Handle error appropriately
}

// Store action error handling
try {
  await this.$store.dispatch('login', credentials);
} catch (error) {
  console.error('Login failed:', error);
  // Show user-friendly error message
}
```

---

## Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run serve
```

### Build for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

---

## API Endpoints

The application expects the following backend endpoints:

- `POST /auth/login` - User authentication
- `POST /users` - User registration
- `GET /boards` - Get all boards
- `GET /boards/:id` - Get specific board
- `GET /users/:id` - Get users for board
- `PUT /boardList/:id` - Update board list

---

## Authentication

The application uses JWT tokens for authentication:
- Tokens are stored in localStorage
- Automatic token attachment to requests via Axios interceptors
- Route guards protect authenticated routes
- Automatic redirect behavior based on authentication state

---

## Styling

The application uses scoped CSS with a blue theme:
- Primary color: `#026aa7`
- Responsive design principles
- Card-based layout for boards and lists
- Hover effects and transitions