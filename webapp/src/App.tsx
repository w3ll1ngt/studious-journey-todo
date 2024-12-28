import React, {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import fastApiLogo from '/FastAPI.svg'
import './App.css'

interface TodoItem { // todo: autogenerate TS interfaces reflecting models from FastAPI
    id: number;
    title: string;
    description?: string;
    completed: boolean;
}

function App() {

    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState<TodoItem[]>([])


    const addTask = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        // todo: send it to fastapi


        setTodos([...todos, {id: todos.length, title: todo, completed: false}])
    }

    const changeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(event.target.value)
    }

    const removeTask = (taskForRemoving: TodoItem) => {
        setTodos(todos.filter((task) => task !== taskForRemoving))
    }

    const toggleReadiness = (taskForChange: TodoItem) => {
        setTodos(todos.map((task) => {
            if (task === taskForChange) {
                task.completed = !task.completed
            }
            return task
        }))
    }


    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://fastapi.tiangolo.com/" className="logo" target="_blank">
                    <img src={fastApiLogo} className="logo" alt="FastAPI logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>h3ll0 b0ss</h1>
            <div className="card">
                <p>do something for todo something</p>

                <form onSubmit={(event) => addTask(event)}>
                    <input type='text' onChange={(event) => changeTask(event)} value={todo}/>
                    <button type="submit">Add a task</button>
                </form>

                {/*<button onClick={() => setCount((count) => count + 1)}>*/}
                {/*    count is {count}*/}
                {/*</button>*/}

            </div>
            <div className="card">
                <div className="ul">
                    {todos.map((todo: TodoItem, i: number) => (
                        <div key={i} className={`li ${todo.completed ? 'ready' : ''}`}>


                            <button className="checkbox"
                                    onClick={() => toggleReadiness(todo)}/>

                            <div className="todo-id">
                                {todo.id}
                            </div>
                            <div className="todo-title">
                                {todo.title}
                            </div>
                            <div className="todo-description">
                                {todo.description}
                            </div>
                            <button className='remove-button'
                                    onClick={() => removeTask(todo)}>

                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <p className="read-the-docs">
                read repo readme for more info
            </p>
        </>
    )
}

export default App
