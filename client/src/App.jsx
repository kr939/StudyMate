import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  async function deleteSubject(index) {
const subjectName = subjects[index];
console.log("Delete clicked:", subjectName);

if (!subjectName) return;

try {
const response = await fetch('http://localhost:5000/api/subjects');

if (!response.ok) {
  throw new Error('Failed to load subjects');
}

const savedSubjects = await response.json();
const subjectToDelete = savedSubjects.find(
  (subject) => subject.name === subjectName
);

if (!subjectToDelete) {
  alert('Subject not found in the database.');
  return;
}

const deleteResponse = await fetch(
  `http://localhost:5000/api/subjects/${subjectToDelete._id}`,
  { method: 'DELETE' }
);

if (!deleteResponse.ok) {
  throw new Error('Failed to delete subject');
}

setSubjects((previousSubjects) =>
  previousSubjects.filter((_, i) => i !== index)
);

} catch (error) {
console.error('Error deleting subject:', error);
alert('Could not delete subject. Please try again.');
}
}
  const [subjects, setSubjects] = useState([
    'Data Structures and Algorithms',
    'Java Programming',
    'Theory of Computation',
    'Computer Organization and Architecture',
    'Discrete Mathematics'
  ])
  useEffect(() => {
  fetch('http://localhost:5000/api/subjects')
    .then((response) => response.json())
    .then((data) => {
      setSubjects(data.map((subject) => subject.name))
    })
    .catch((error) => {
      console.error('Error loading subjects:', error)
    })
}, [])
useEffect(() => {
  fetch('http://localhost:5000/api/tasks')
    .then((response) => response.json())
    .then((data) => {
      setTasks(data)
    })
    .catch((error) => {
      console.error('Error loading tasks:', error)
    })
}, [])
   const [newSubject, setNewSubject] = useState('')
   const [tasks, setTasks] = useState([])
   const [studyPlans, setStudyPlans] = useState([]);
   const handleDeletePlan = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/study-plans/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete study plan');
    }

    setStudyPlans((previousPlans) =>
      previousPlans.filter((plan) => plan._id !== id)
    );

    alert('Study plan deleted successfully!');
  } catch (error) {
    console.error('Error deleting study plan:', error);
    alert('Could not delete study plan. Please try again.');
  }
};
   const [newTask, setNewTask] = useState('')
   const [dueDate, setDueDate] = useState('')
   useEffect(() => {
  fetch('http://localhost:5000/api/study-plans')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load study plans');
      }
      return response.json();
    })
    .then((data) => {
      setStudyPlans(data);
    })
    .catch((error) => {
      console.error('Error loading study plans:', error);
    });
}, []);
  async function addTask() {
  const title = newTask.trim();

  if (title === '') {
    return;
  }  
   try {
    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        dueDate: dueDate,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save task');
    }

    const savedTask = await response.json();

    setTasks((previousTasks) => [...previousTasks, savedTask]);
    setNewTask('');
    setDueDate('');
  } catch (error) {
    console.error('Error saving task:', error);
    alert('Could not save task. Please try again.');
  }
}

function toggleTask(taskId) {
  setTasks(
    tasks.map((task) =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    )
  )
}

function deleteTask(taskId) {
  setTasks(tasks.filter((task) => task.id !== taskId))
}
   async function addSubject() {
  const name = newSubject.trim();

  if (name === "") {
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/subjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error("Failed to add subject");
    }

    const savedSubject = await response.json();

    setSubjects([...subjects, savedSubject.name || savedSubject.subject || name]);
    setNewSubject("");
  } catch (error) {
    alert("Could not save subject. Please check the backend.");
    console.error(error);
  }
}
  return (
     
    <div className="app">
      <aside className="sidebar">
        <h2>StudyMate</h2>
        <p className="tagline">Your study companion</p>

        <nav>
          <a className="active" href="#dashboard">Dashboard</a>
          <a href="#subjects">My Subjects</a>
          <a href="#tasks">My Tasks</a>
          <a href="#planner">Study Planner</a>
          <a href="#progress">My Progress</a>
        </nav>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="welcome">
          <div>
            <p className="eyebrow">YOUR PERSONAL STUDY SPACE</p>
            <h1>Welcome to StudyMate!</h1>
            <p>Organize your studies, one step at a time.</p>
          </div>
          <div className="profile">Student</div>
        </header>
<section className="stats">
<section className="stats">
  <div className="stat-card">
    <span>Total Tasks</span>
    <h2>{tasks.length}</h2>
    <p>Your tasks will appear here</p>
  </div>

  <div className="stat-card">
    <span>Pending Tasks</span>
    <h2>{tasks.filter((task) => !task.completed).length}</h2>
    <p>Things to work on</p>
  </div>

  <div className="stat-card">
    <span>Completed Tasks</span>
    <h2>{tasks.filter((task) => task.completed).length}</h2>
    <p>Celebrate your progress</p>
  </div>
</section>
        </section>
                <section className="content-card" id="progress">
          <h2>My Progress</h2>
          <p>Track your study tasks and celebrate your achievements!</p>

          <div className="progress-stats">
            <div className="stat-card">
              <span>Total Tasks</span>
              <h2>{tasks.length}</h2>
            </div>

            <div className="stat-card">
              <span>Completed Tasks</span>
              <h2>
                {tasks.filter((task) => task.completed).length}
              </h2>
            </div>

            <div className="stat-card">
              <span>Pending Tasks</span>
              <h2>
                {tasks.filter((task) => !task.completed).length}
              </h2>
            </div>
          </div>

          <div className="progress-bar-container">
            <p>Overall Completion</p>

            <div
              style={{
                width: '100%',
                height: '20px',
                backgroundColor: '#e5e7eb',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${
                    tasks.length === 0
                      ? 0
                      : Math.round(
                          (tasks.filter((task) => task.completed).length /
                            tasks.length) *
                            100
                        )
                  }%`,
                  height: '100%',
                  backgroundColor: '#2563eb',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>

            <p>
              {tasks.length === 0
                ? 0
                : Math.round(
                    (tasks.filter((task) => task.completed).length /
                      tasks.length) *
                      100
                  )}
              % completed
            </p>
          </div>
        </section>

        
        
          <section className="content-card" id="tasks">
            
  <h2>My Tasks</h2>
  <p>Add and manage your daily study tasks here.</p>

  <form
    onSubmit={(event) => {
      event.preventDefault()
      addTask()
    }}
  >
    <input
      type="text"
      value={newTask}
      onChange={(event) => setNewTask(event.target.value)}
      placeholder="Enter task name"
    />

    <input
      type="date"
      value={dueDate}
      onChange={(event) => setDueDate(event.target.value)}
    />

    <button type="submit">Add Task</button>
  </form>

  <div className="task-list">
    {tasks.map((task) => (
      <div key={task.id} className="task-item">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />

        <span>{task.title}</span>
        <span>{task.dueDate}</span>

        <button
          type="button"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    ))}
  </div>
</section>
<section className="content-card" id="subjects">
  <h2>My Subjects</h2>
  <p>Add and manage your college subjects here.</p>

  <form
    className="subject-form"
    onSubmit={(event) => {
      event.preventDefault()
      addSubject()
    }}
  >
    <input
      type="text"
      value={newSubject}
      onChange={(event) => setNewSubject(event.target.value)}
      placeholder="Enter subject name"
    />

    <button type="submit">Add Subject</button>
  </form>

  <div className="subject-list">
    {subjects.map((subject, index) => (
      <div className="subject-item" key={index}>
        <span>{subject}</span>
        <button
          type="button"
          onClick={() => deleteSubject(index)}
        >
          Delete
        </button>
      </div>
    ))}
   </div >
  </section>

      <section className="content-card">
        <h2>Today's Focus</h2>
  <p>Your study journey starts here.</p>
  <p>We'll add your subjects, assignments and study schedule next.</p>
  <button onClick={() => alert('Welcome to StudyMate!')}>
    Let's Get Started
  </button>
      </section>
    <section id="planner" className="planner-section">
  <h2>Study Planner</h2>
  <p>Plan your study sessions and organise your learning schedule.</p>

  <div className="planner-card">
    <h3>Create a Study Plan</h3>

    <form
      onSubmit={async (e) => {
  e.preventDefault();

  const form = e.currentTarget;

  const studyPlan = {
    subject: form.elements.studySubject.value,
    topic: form.elements.studyTopic.value,
    studyDate: form.elements.studyDate.value,
    duration: Number(form.elements.studyDuration.value),
  };

  try {
    console.log('Submitting study plan:', studyPlan);
    const response = await fetch(
      'http://localhost:5000/api/study-plans',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studyPlan),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Could not save study plan');
    }

    alert('Study plan saved successfully!');
    form.reset();
  } catch (error) {
    console.error('Error saving study plan:', error);
    alert('Could not save the study plan. Please check the backend.');
  }
}}
      
    >
      <label htmlFor="studySubject">Subject</label>
      <input
        type="text"
        id="studySubject"
        placeholder="Enter subject (e.g., DSA)"
        required
      />

      <label htmlFor="studyTopic">Topic</label>
      <input
        type="text"
        id="studyTopic"
        placeholder="Enter topic to study"
        required
      />

      <label htmlFor="studyDate">Study Date</label>
      <input
        type="date"
        id="studyDate"
        required
      />

      <label htmlFor="studyDuration">Duration (minutes)</label>
      <input
        type="number"
        id="studyDuration"
        min="1"
        placeholder="e.g., 60"
        required
      />

      <button type="submit">Add Study Plan</button>
    </form>s
  <div className="saved-plans">
  <h3>My Study Plans</h3>

  {studyPlans.length === 0 ? (
    <p>No study plans added yet.</p>
  ) : (
    studyPlans.map((plan) => (
      <div className="study-plan-item" key={plan._id}>
        <h4>{plan.subject}</h4>
        <p>Topic: {plan.topic}</p>
        <p>Date: {plan.studyDate}</p>
        <p>Duration: {plan.duration} minutes</p>

        <button
          type="button"
          onClick={() => handleDeletePlan(plan._id)}
        >
          Delete
        </button>
      </div>
    ))
  )}
</div>
  </div>
</section>
</main>
</div>
  );
}

export default App;