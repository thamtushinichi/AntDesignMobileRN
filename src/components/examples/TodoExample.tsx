// src/components/examples/TodoExample.tsx
import React, { useState } from 'react';
import { YStack, XStack, Text, Input, Button, Checkbox, Separator, View } from 'tamagui';
import { Check, Plus, X } from '@tamagui/lucide-icons';
import { toastService } from '../../components/ui';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

const TodoExample: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', text: 'Learn React Native', completed: false },
    { id: '2', text: 'Study Tamagui', completed: true },
    { id: '3', text: 'Build a Todo App', completed: false },
  ]);

  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo,
          completed: false,
        },
      ]);
      setNewTodo('');
      toastService.success('Todo added!');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toastService.info('Todo removed');
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <YStack padding="$md" space="$lg">
      <Text fontSize="$xl" fontWeight="bold" textAlign="center">
        Todo List
      </Text>

      <XStack space="$sm">
        <Input
          flex={1}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Add a new todo"
        />
        <Button
          size="medium"
          onPress={addTodo}
          icon={<Plus size="$md" />}
        >
          Add
        </Button>
      </XStack>

      <XStack justifyContent="center" space="$sm">
        <Button
          variant={filter === 'all' ? 'primary' : 'outline'}
          size="small"
          onPress={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'primary' : 'outline'}
          size="small"
          onPress={() => setFilter('active')}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'primary' : 'outline'}
          size="small"
          onPress={() => setFilter('completed')}
        >
          Completed
        </Button>
      </XStack>

      <YStack
        backgroundColor="$card"
        borderRadius="$md"
        borderColor="$borderColor"
        borderWidth={1}
        overflow="hidden"
        minHeight={200}
      >
        {filteredTodos.length === 0 ? (
          <YStack flex={1} alignItems="center" justifyContent="center" padding="$lg">
            <Text color="$textMuted">
              No {filter === 'all' ? '' : filter} tasks found
            </Text>
          </YStack>
        ) : (
          filteredTodos.map((todo, index) => (
            <View key={todo.id}>
              {index > 0 && <Separator />}
              <XStack
                padding="$md"
                alignItems="center"
                justifyContent="space-between"
              >
                <XStack flex={1} alignItems="center" space="$sm">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    borderColor="$borderColor"
                  >
                    <Checkbox.Indicator>
                      <Check size="$sm" />
                    </Checkbox.Indicator>
                  </Checkbox>
                  <Text
                    color="$color"
                    textDecorationLine={todo.completed ? 'line-through' : 'none'}
                    opacity={todo.completed ? 0.6 : 1}
                  >
                    {todo.text}
                  </Text>
                </XStack>
                <Button
                  size="$sm"
                  variant="ghost"
                  circular
                  icon={<X size="$sm" color="$error" />}
                  onPress={() => deleteTodo(todo.id)}
                />
              </XStack>
            </View>
          ))
        )}
      </YStack>
    </YStack>
  );
};

export default TodoExample;
