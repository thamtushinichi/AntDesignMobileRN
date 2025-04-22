// src/store/zustand/todoStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

type FilterType = 'all' | 'active' | 'completed';

interface TodoState {
  todos: Todo[];
  filter: FilterType;
  // Actions
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  setFilter: (filter: FilterType) => void;
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoState>()(
  immer((set) => ({
    todos: [],
    filter: 'all',

    addTodo: (title) => {
      set((state) => {
        state.todos.push({
          id: Date.now().toString(),
          title,
          completed: false,
          createdAt: Date.now(),
        });
      });
    },

    toggleTodo: (id) => {
      set((state) => {
        const todo = state.todos.find((todo) => todo.id === id);
        if (todo) {
          todo.completed = !todo.completed;
        }
      });
    },

    removeTodo: (id) => {
      set((state) => {
        state.todos = state.todos.filter((todo) => todo.id !== id);
      });
    },

    setFilter: (filter) => {
      set((state) => {
        state.filter = filter;
      });
    },

    clearCompleted: () => {
      set((state) => {
        state.todos = state.todos.filter((todo) => !todo.completed);
      });
    },
  }))
);

// Memoized selectors
export const selectFilteredTodos = (state: TodoState) => {
  switch (state.filter) {
    case 'active':
      return state.todos.filter((todo) => !todo.completed);
    case 'completed':
      return state.todos.filter((todo) => todo.completed);
    default:
      return state.todos;
  }
};

export const selectTodoStats = (state: TodoState) => {
  const completed = state.todos.filter((todo) => todo.completed).length;
  return {
    total: state.todos.length,
    active: state.todos.length - completed,
    completed,
  };
};
