import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const task = {
      text: newTask,
      date: taskDate,
      time: taskTime,
      completed: false,
    };

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = task;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
    }

    setNewTask("");
    setTaskDate("");
    setTaskTime("");
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleToggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const handleEdit = (index) => {
    setNewTask(tasks[index].text);
    setTaskDate(tasks[index].date);
    setTaskTime(tasks[index].time);
    setEditIndex(index);
  };

  return (
    <div className="app">
      <h1>To-Do Web App</h1>

      <div className="task-input">
        <input
          type="text"
          placeholder="Enter task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
        />
        <input
          type="time"
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
        />
        <button onClick={handleAddTask}>
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <div className="task-info">
              <span>{task.text}</span>
              {task.date && <small>{task.date}</small>}
              {task.time && <small>{task.time}</small>}
            </div>

            <div className="task-actions">
              <button onClick={() => handleToggleComplete(index)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;