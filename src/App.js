import MainHeader from './components/MainHeader';
import Main from './components/Main';
import { useState } from 'react';

function App() {
  const initialTodos = {
    id: 'TODO15001',
    todo: 'Test todo one',
    active: true,
    selected: false,
    completed: false
  };
  const [todos, setTodos] = useState([initialTodos]);
  
  return (
    <div>
      <section className='todoapp'>
        <MainHeader addTodo={setTodos} todos={todos} />
        <Main setTodos={setTodos} todos={todos}  />
      </section>
    </div>
  );
}

export default App;
