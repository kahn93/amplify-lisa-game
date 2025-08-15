import React, { useState } from 'react';
import Button from '../components/Button';

interface Task {
  id: string;
  description: string;
  reward: number;
  completed: boolean;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', description: 'Join Telegram Channel A', reward: 100, completed: false },
    { id: '2', description: 'Share Telegram Post B', reward: 200, completed: false },
    // Add more tasks here...
  ]);

  const handleComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
    alert('Task completed! Reward added to your account.');
  };

  return (
    <div className="tasks-page">
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <p>{task.description}</p>
            <p>Reward: {task.reward} coins</p>
            <Button
              label={task.completed ? 'Completed' : 'Complete Task'}
              onClick={() => handleComplete(task.id)}
              disabled={task.completed}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
