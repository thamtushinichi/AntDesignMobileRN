import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import {
  Button,
  List,
  SwipeAction,
  WhiteSpace,
  WingBlank,
  Checkbox,
} from '@ant-design/react-native';
import {selectTheme, useThemeStore} from '../../store/zustand';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

const TodoExample: React.FC = () => {
  const {antColors} = useThemeStore(selectTheme);

  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', text: 'Learn React Native', completed: false },
    { id: '2', text: 'Study Ant Design Mobile', completed: true },
    { id: '3', text: 'Build a Todo App', completed: false },
  ]);

  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now().toString(),
        text: newTodo,
        completed: false
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <View style={[styles.container, { backgroundColor: antColors.fill_body }]}>
      <ScrollView>
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <Text style={[styles.title, { color: antColors.color_text_base }]}>
            Todo List
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, {
                color: antColors.color_text_base,
                borderColor: antColors.border_color_base,
                backgroundColor: antColors.fill_base,
              }]}
              value={newTodo}
              onChangeText={setNewTodo}
              placeholder="Add a new todo"
              placeholderTextColor={antColors.color_text_placeholder}
            />
            <Button type="primary" onPress={addTodo} style={styles.addButton}>
              Add
            </Button>
          </View>

          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />

          <List>
            {filteredTodos?.map(todo => (
              <SwipeAction
                key={todo.id}
                style={{ backgroundColor: 'transparent' }}
                autoClose
                right={[
                  {
                    text: 'Delete',
                    onPress: () => deleteTodo(todo.id),
                    style: { backgroundColor: antColors.error_color, color: '#fff' },
                  },
                ]}
              >
                <List.Item
                  thumb={
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />
                  }
                >
                  <Text
                    style={[
                      { color: antColors.color_text_base },
                      todo.completed && styles.completedText,
                    ]}
                  >
                    {todo.text}
                  </Text>
                </List.Item>
              </SwipeAction>
            ))}
          </List>

          {filteredTodos.length === 0 && (
            <Text style={[styles.emptyText, { color: antColors.color_text_caption }]}>
              No {filter === 'all' ? '' : filter} tasks found
            </Text>
          )}
          <WhiteSpace size="xl" />
        </WingBlank>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    height: 40,
    justifyContent: 'center',
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default TodoExample;
