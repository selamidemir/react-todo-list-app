import { useState, useEffect } from 'react';

function Main({ setTodos, todos }) {
    const [listTodos, setListTodos] = useState([]);
    const [todoListFilter, setTodoListFilter] = useState("All");
    const [activeTodosCount, setActiveTodosCount] = useState(0);

    useEffect(() => {
        let newTodos = [];
        if (todoListFilter === "Active") {
            newTodos = todos.filter((todo) => todo.selected === true);
        } else if (todoListFilter === "Completed") {
            newTodos = todos.filter((todo) => todo.completed === true);
        } else {
            newTodos = todos;
        }
        setListTodos(newTodos);
    }, [todos, todoListFilter]);

    useEffect(() => {
        setActiveTodosCount(listTodos.length);
    }, [listTodos]);
    const setTodoSelect = (e) => {
        let newTodos = todos.map((todo) => {
            if (todo.id === e.target.getAttribute('todoid')) {
                todo.selected = !todo.selected;
            }
            return todo;
        });
        setTodos(newTodos);
    }

    const setTodoCompleted = (e) => {
        let newTodos = todos.map((todo) => {
            if (todo.id === e.target.getAttribute('todoid')) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(newTodos);
    }

    const deleteTodo = (e) => {
        let newTodos = todos.filter((todo) => {
            return todo.id !== e.target.getAttribute('todoid')
        });
        setTodos(newTodos);
    }

    const toggleAllTodo = (e) => {
        let todoListDOM = document.querySelector('.todo-list');
        todoListDOM.classList.toggle('toggle-all');
    }

    const deleteCopletedTodos = (e) => {
        let newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    }

    return (
        <>
            <section className="main">
                <input className="toggle-all" type="checkbox" />
                <label htmlFor="toggle-all" onClick={toggleAllTodo}>
                    Mark all as complete
                </label>

                <ul className="todo-list">
                    {listTodos.map((todo, index) => {
                        return (
                            <li className={todo.completed ? "completed" : ""} key={index}>
                                <div className="view">
                                    <input className="toggle" type="checkbox" todoid={todo.id}
                                        onChange={setTodoSelect} checked={todo.selected} />
                                    <label onClick={setTodoCompleted} todoid={todo.id}>{todo.todo}</label>
                                    <button className="destroy" todoid={todo.id} onClick={deleteTodo}></button>
                                </div>
                            </li>

                        )
                    })
                    }
                </ul>
            </section>

            <footer className="footer">
                <span className="todo-count">
                    <strong>({activeTodosCount}) </strong>
                    items left
                </span>

                <ul className="filters">
                    <li>
                        <i className={todoListFilter === 'All' ? "selected" : ""} onClick={() => setTodoListFilter("All")}>All</i>
                    </li>
                    <li>
                        <i className={todoListFilter === 'Active' ? "selected" : ""} onClick={() => setTodoListFilter("Active")}>Active</i>
                    </li>
                    <li>
                        <i className={todoListFilter === 'Completed' ? "selected" : ""} onClick={() => setTodoListFilter("Completed")}>Completed</i>
                    </li>
                </ul>

                <button className="clear-completed" onClick={deleteCopletedTodos}>
                    Clear completed
                </button>
            </footer>

            <footer className="info">
                <p>Click to edit a todo</p>
                <p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
        </>
    );
}

export default Main;