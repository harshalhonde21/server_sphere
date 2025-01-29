import React, { useState, useEffect } from 'react';
import supabase from '../supabase.js'; 

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch Todos
  const fetchTodos = async () => {
    setLoading(true);
    const { data: todos, error } = await supabase
      .from('todo')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching todos:', error.message);
      alert(`Error fetching todos: ${error.message}`);
    } else {
      setTodos(todos);
    }
    setLoading(false);
  };

  // Add Todo
  const addTodo = async () => {
    if (!newTodo.trim()) return alert('Please enter a todo!');
    const { data, error } = await supabase
      .from('todo')
      .insert([{ text: newTodo }])
      .select();
    if (error) {
      console.error('Error adding todo:', error.message);
      alert(`Error adding todo: ${error.message}`);
    } else {
      setTodos([data[0], ...todos]);
      setNewTodo('');
    }
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    const { error } = await supabase.from('todo').delete().eq('id', id);
    if (error) {
      console.error('Error deleting todo:', error.message);
      alert(`Error deleting todo: ${error.message}`);
    } else {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-100 to-gray-300">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mt-10">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
          Todo App
        </h1>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your todo..."
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300"
          >
            Add
          </button>
        </div>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <span className="text-gray-800">{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-lg transition duration-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        {todos.length === 0 && !loading && (
          <p className="text-center text-gray-500 mt-4">
            No todos yet! Add your first one.
          </p>
        )}
      </div>
    </div>
  );
};

export default Todo;