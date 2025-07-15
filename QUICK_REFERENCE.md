# Quick Reference Guide

## Most Used APIs and Functions

### Authentication
```javascript
// Login
await this.$store.dispatch('login', { login: 'username', password: 'password' });

// Logout
this.$store.dispatch('logout');

// Check authentication
this.$store.getters.isAuth

// Sign up
await this.$store.dispatch('signUp', { username: 'user', password: 'pass', email: 'user@example.com' });
```

### Board Management
```javascript
// Get all boards
await this.$store.dispatch('fetchBoards');
const boards = this.$store.getters.getBoards;

// Get specific board
await this.$store.dispatch('fetchBoard', 'board-id');
const board = this.$store.getters.getBoard;

// Update list name
await service.updateList({ id: 'list-id', boardListName: 'New Name' });
```

### Navigation
```javascript
// Navigate to board
this.$router.push({ name: 'board', params: { id: 'board-id' } });

// Navigate to main
this.$router.push('/main');

// Navigate to profile
this.$router.push('/profile');
```

### Service API
```javascript
import service from '@/services/service';

// Get boards
const boards = await service.getBoards();

// Get board
const board = await service.getBoard('board-id');

// Get users for board
const users = await service.getUsersForBoard('board-id');
```

### Common Component Props
```vue
<!-- Board List -->
<board-list
  :boardListName="list.boardListName"
  :id="list._id"
  :cards="list.cardId"
></board-list>

<!-- Card -->
<card :cardName="card.cardName"></card>
```

### Vuex Store Structure
```javascript
// State
state: {
  auth: {
    token: String | null,
    userId: String | null
  },
  boards: {
    boards: Array,
    board: Array,
    users: Array
  }
}

// Common getters
this.$store.getters.isAuth
this.$store.getters.getBoards
this.$store.getters.getBoard
this.$store.getters.getUsers
```

## Routes
- `/` → Redirects to `/auth`
- `/auth` → Authentication page
- `/main` → Main dashboard (requires auth)
- `/board/:id` → Board view (requires auth)
- `/profile` → User profile (requires auth)

## Key Components
- `TheNavigation` - Main navigation
- `BoardList` - Board list with cards
- `Card` - Individual card display
- `NotFound` - 404 page

## Development Commands
```bash
npm install        # Install dependencies
npm run serve      # Start development server
npm run build      # Build for production
npm run lint       # Run linting
```