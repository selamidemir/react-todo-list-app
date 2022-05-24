import {useState} from 'react';

function MainHeader({addTodo, todos}) {
  let initialTodo = {
    todo: '',
    active: true,
    selected: false,
    completed: false
  }
  let [inputTodo, setInputTodo] = useState('');

  const formOnSubmit = (e) => {
    e.preventDefault();
    // Yeni todo için id oluşturalım
    // Bunun için en son todonun id değerine 1 ekleyelim
    let lastTodoId = todos[todos.length-1].id;
    let newTodoId = 'TODO' + (Number(lastTodoId.split("TODO")[1])+1);
    let newTodo = { ...initialTodo, todo: inputTodo, id: newTodoId};
    addTodo([...todos, newTodo]);
    setInputTodo('');
  }

  return (
    <header className='header'>
        <h1>todos</h1>
        <form onSubmit={formOnSubmit}>
          <input id="inputTodo" onChange={(e) => setInputTodo(e.target.value)} 
                className="new-todo" placeholder="What needs to be done?" autoFocus 
                value={inputTodo} />
        </form>
    </header>
  );
}

export default MainHeader;