# Quick Prototype Development Guide

## Philosophy
Build demos fast without accumulating technical debt. Prioritize clarity and simplicity over premature optimization.

## Architecture Principles

### Single Backend Pattern
- One Express server handles all API routes
- Collocate related routes in logical groups (e.g., `/api/users`, `/api/products`)
- Keep route handlers in the same file initially; extract only when file exceeds ~200 lines

### In-Memory State Management
```javascript
// Simple, effective for demos
const store = {
  users: [],
  products: [],
  sessions: new Map()
};
```
- Use plain objects/arrays for collections
- Use Map for key-value lookups
- No ORM, no migrations, no connection pooling
- Data resets on server restart (feature, not bug)

### React Frontend
- Functional components only
- Co-locate state with usage
- Extract components when reused 2+ times, not before
- Use Context for truly global state (auth, theme)

## API-First Development

### Before Writing Code
Write OpenAPI spec for each feature:

```yaml
paths:
  /api/users:
    post:
      summary: Create user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [name, email]
              properties:
                name: { type: string }
                email: { type: string, format: email }
      responses:
        201:
          description: User created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
```

**Benefits:**
- Clarifies requirements before implementation
- Frontend/backend can be developed in parallel
- Auto-generate API docs
- Easy to add validation later

### Implementation Order
1. Write OpenAPI spec (5 min)
2. Implement backend route with in-memory storage (10 min)
3. Test with curl/Postman (2 min)
4. Build React UI (15 min)

## Project Structure

```
/backend
  server.js           # Main server, all routes initially
  store.js            # In-memory data store
  api-spec.yaml       # OpenAPI specification

/frontend
  /src
    App.jsx           # Main app, initial routes
    /components       # Extract only when reused
    /api              # API client functions
```

## Best Practices for Rapid Prototyping

### Do
- ✓ Use express.json() middleware, not custom body parsers
- ✓ Return consistent JSON responses: `{ data, error, message }`
- ✓ Add basic validation (check required fields exist)
- ✓ Use descriptive variable names
- ✓ Write API spec before implementation
- ✓ Keep related code together initially

### Don't
- ✗ Set up authentication until explicitly needed
- ✗ Add error handling beyond basic try-catch
- ✗ Create abstractions "for future use"
- ✗ Split files prematurely
- ✗ Add TypeScript, linting, or tests unless required
- ✗ Implement pagination until you have 100+ items

## Common Patterns

### API Client (Frontend)
```javascript
// frontend/src/api/users.js
const API_BASE = 'http://localhost:3000/api';

export const createUser = async (userData) => {
  const res = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return res.json();
};
```

### Route Handler (Backend)
```javascript
// backend/server.js
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const user = { id: Date.now(), name, email };
  store.users.push(user);

  res.status(201).json({ data: user });
});
```

## When to Refactor

Refactor only when you hit these thresholds:
- File exceeds 200 lines → split by feature
- Logic used 3+ times → extract function
- Component renders 5+ times → optimize with memo
- Data structure queried inefficiently → add index/Map

## Running the Demo

```bash
# Backend
cd backend && npm start

# Frontend
cd frontend && npm run dev
```

Keep dependencies minimal. For this template: express, cors, vite, react.

---

**Remember:** The goal is a working demo, not production code. Optimize for speed of iteration and clarity of intent.