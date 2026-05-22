import './App.css';
import {useState, useEffect} from 'react';  

function App() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/tasks/')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  
  const [title, setTitle] = useState('');
  const addTask = () => {
    fetch('http://localhost:8000/api/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        is_recommended: false,
      }),
    })
    .then(response => response.json())
    .then(data => {
      setTasks([...tasks, data]);
    });
  };
  
  return (
    <div className="App">
      <h1>Task Management System</h1>

       <input
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>


      {tasks.map(task => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>Status: {task.is_completed ? 'Completed' : 'Pending'}</p>
        </div>
      ))}

    </div>
  );
}

export default App;
