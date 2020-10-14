// https://www.digitalocean.com/community/tutorials/how-to-build-a-react-to-do-app-with-react-hooks
// Digital Ocean Tutorial
// How to Build a React To-Do App with React Hooks
import React, { useState } from 'react';

export default function Todos() {
    // Create a slice of state for an array of todo objects
    // Set initial text values for three todos
    // Give each todo a key of isCompleted set initially to false
    const [todos, setTodos] = useState([
        {
        text: "Learn about React",
        isCompleted: false
         },
        {
        text: "Meet friend for lunch",
        isCompleted: false
        },
        {
        text: "Build really cool todo app",
        isCompleted: false
        }
    ]);
   const addTodo = text => {
       // Create a new copy of array and add the new object
       const newTodos = [...todos, {text: text, isCompleted: false}];
       // update State
       setTodos(newTodos);
   };
   const completeTodo = index => {
       // Create a new copy of array and update object at index to isCompleted: true
       const newTodos = [...todos];
       newTodos[index].isCompleted = true;
       // upDate State
       setTodos(newTodos);
   }
   const removeTodo = index => {
       // Create a new copu of array and remove object at index
       const newTodos = [...todos];
       newTodos.splice(index, 1);
       // update State
       setTodos(newTodos);
   }
    return (
        // Return div list JSX, exported to index.js to be rendered by ReactDOM
        <div className="container">
            <div className="todo-list">
            <h2>TODO</h2>
            {/* Map over slice of state array of objects
            to create individual todo item passing in props to TodoItem function
            Passing in functions to handle updates to state */}
            {todos.map((todo, index) => (
                <TodoItem
                key={index}
                index={index}
                todo={todo}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                />
            ))}
            {/* Render Todo form passing in addTodo function as props */}
            <TodoForm addTodo={addTodo} />
            </div>
       </div>
    )
}
// Function creates individual todo item 
function TodoItem({todo, index, completeTodo, removeTodo}){
    return (
        <div className="todo"
        // Checks for value of isCompleted when rendering
            style={{ textDecoration: todo.isCompleted? "line-through": ""}}>
           {todo.text}
           <div>
               {/* click calls completeTodo passing index
               results in line through textDecoration when updated */}
            <button onClick={(e)=> {
                e.preventDefault();
                completeTodo(index);
                }}>Complete</button>
                {/* click calls removeTodo passing index
               results in line deletion of todo when updated */}
            <button onClick={() => removeTodo(index)}>x</button>
           </div>
        </div>
    );
}
//Creates form input field to add todo
// Uses its own slice of state to hold input value
function TodoForm({addTodo}){
    const [value, setValue] = useState("");
    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    };
    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            className="input"
            value={value}
            onChange={e => setValue(e.target.value)}
            />
        </form>
    );
}