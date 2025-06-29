import { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const API_URL = 'https://todo-task-manager-hackathon.onrender.com/api/tasks';

  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        API_URL,
        {
          title,
          dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle('');
      setDueDate('');
      onTaskAdded(res.data); // Notify parent
    } catch (err) {
      console.error('Error adding task:', err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleAddTask} style={{ marginBottom: '2rem' }}>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ marginRight: '10px' }}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button type="submit">➕ Add Task</button>
    </form>
  );
};

export default TaskForm;
