# Setting Up Zustand with Immer in React Native

This guide provides step-by-step instructions for adding Zustand with Immer to your React Native project.

## Installation

1. Install Zustand and Immer:

```bash
pnpm add zustand immer
```

## Project Structure

Create a directory structure for your stores:

```
src/
└── store/
    └── zustand/
        ├── createStore.ts     # Store factory 
        ├── authStore.ts       # Authentication state
        ├── themeStore.ts      # Theme state 
        ├── formStore.ts       # Form state management
        └── index.ts           # Re-exports
```

## Core Files

### 1. Create a Store Factory

First, create a utility function that applies Immer middleware and optional persistence:

```typescript
// src/store/zustand/createStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Type for state persistence configuration
interface PersistOptions {
  name: string;
  enabled?: boolean;
}

/**
 * Create a store factory with Immer middleware
 * Optionally configure persistence with AsyncStorage
 */
export function createStore<T extends object>(
  initialState: T,
  persistOptions?: PersistOptions,
) {
  // Create store with immer middleware
  if (!persistOptions || !persistOptions.enabled) {
    return create<T>()(
      immer(() => initialState)
    );
  }

  // Create persisted store with immer middleware
  return create<T>()(
    persist(
      immer(() => initialState),
      {
        name: persistOptions.name,
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );
}

// Helper types
export type StoreType<T> = ReturnType<typeof createStore<T>>;
export type StateFromStore<S> = S extends StoreType<infer T> ? T : never;
```

### 2. Create an Index File

Create an index file to export all your stores:

```typescript
// src/store/zustand/index.ts
export * from './createStore';
export * from './authStore';
export * from './themeStore';
// Add other exports as needed
```

## Creating Your First Store

Here's how to create a simple counter store:

```typescript
// src/store/zustand/counterStore.ts
import { createStore } from './createStore';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// Initial state with action stubs
const initialState: CounterState = {
  count: 0,
  increment: () => {},
  decrement: () => {},
  reset: () => {},
};

// Create the store
export const useCounterStore = createStore<CounterState>(
  initialState,
  { name: 'counter-store', enabled: true } // Enable persistence
);

// Implement actions
useCounterStore.setState((state) => {
  state.increment = () => {
    state.count += 1; // With Immer, you can "mutate" state directly
  };
  
  state.decrement = () => {
    state.count -= 1;
  };
  
  state.reset = () => {
    state.count = 0;
  };
});
```

## Using a Store in Components

```tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useCounterStore } from '../store/zustand/counterStore';

const CounterScreen = () => {
  // Get state and actions from the store
  const count = useCounterStore(state => state.count);
  const { increment, decrement, reset } = useCounterStore();
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Count: {count}</Text>
      <Button title="Increment" onPress={increment} />
      <Button title="Decrement" onPress={decrement} />
      <Button title="Reset" onPress={reset} />
    </View>
  );
};

export default CounterScreen;
```

## Creating an Auth Store

Here's how to implement authentication with Zustand:

```typescript
// src/store/zustand/authStore.ts
import { createStore } from './createStore';
import authService from '../../services/authService';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  // Add more actions as needed
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  login: async () => false,
  register: async () => false,
  logout: async () => {},
};

// Create auth store with persistence
export const useAuthStore = createStore<AuthState>(
  initialState,
  { name: 'auth-store', enabled: true }
);

// Implement the actions
useAuthStore.setState((state) => {
  state.login = async (email: string, password: string) => {
    state.isLoading = true;
    state.error = null;
    
    try {
      const result = await authService.login(email, password);
      state.user = result.user;
      state.isAuthenticated = true;
      return true;
    } catch (error) {
      state.error = error instanceof Error 
        ? error.message 
        : 'Login failed';
      return false;
    } finally {
      state.isLoading = false;
    }
  };
  
  // Implement other actions...
});

// Selectors
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const selectUser = (state: AuthState) => state.user;
```

## Migrating from Context to Zustand

If you're migrating from React Context, follow these steps:

1. **Create a Zustand store** that matches your context state and actions
2. **Remove your context providers** from your component tree
3. **Use the store directly** in your components with hooks

### Example: Replacing AuthContext with Zustand

#### Before (Context):
```tsx
// In components
const { user, login } = useAuth();

// In App.tsx
<AuthProvider>
  <App />
</AuthProvider>
```

#### After (Zustand):
```tsx
// In components
const user = useAuthStore(state => state.user);
const login = useAuthStore(state => state.login);

// In App.tsx
// No providers needed!
<App />
```

## Advanced Features

### Selectors

Create selectors to derive data from your store:

```typescript
// In your store file
export const selectActiveUser = (state: AuthState) => 
  state.user && state.lastActive > Date.now() - 86400000 ? state.user : null;

// In your component
const activeUser = useAuthStore(selectActiveUser);
```

### Store Subscriptions

Subscribe to changes outside of React components:

```typescript
// Listen for changes
const unsubscribe = useAuthStore.subscribe(
  (state) => state.isAuthenticated,
  (isAuthenticated) => {
    console.log('Auth state changed:', isAuthenticated);
    // Perform side effects
  }
);

// Unsubscribe when done
unsubscribe();
```

## Tips for Success

1. **Define types**: Always use TypeScript for your stores
2. **Use Immer for complex state**: Let Immer handle immutability
3. **Keep stores focused**: Create separate stores for different domains
4. **Use selectors**: Extract reusable pieces of state with selectors
5. **Be careful with persistence**: Only persist what's necessary
6. **Keep state minimal**: Don't duplicate state that can be derived

## Conclusion

Zustand with Immer provides a powerful and simple state management solution for React Native. With minimal boilerplate, you get:

- Typescript support
- Immutability with Immer
- Persistence with AsyncStorage
- Performance optimizations
- No providers needed
- Easy testing

Happy coding!
