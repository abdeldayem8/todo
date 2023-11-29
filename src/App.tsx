import React,{ChangeEvent, FC,useEffect,useState} from 'react';

import './App.css';
import {ITask} from './interfaces';
import Todotask from './Component/Todotask/Todotask';
const App:FC =() => {
  const storedTodoString = localStorage.getItem('todo');
  const initialTodo = storedTodoString ? JSON.parse(storedTodoString) : [];
  const [task, setTask] = useState<string>("");
  const [deadline, setdeadline] = useState<number>(0);
  const [todo, settodo] = useState<ITask[]>(initialTodo);

  const handleChange=(event:ChangeEvent<HTMLInputElement>):void=>{
    if(event.target.name==='task'){
    setTask(event.target.value);
    }else{
      setdeadline(Number(event.target.value));
    }
  }
  useEffect(() => {
    const storedTodo = localStorage.getItem('todo');
    if (storedTodo) {
      settodo(JSON.parse(storedTodo));
    }
  }, []);
  useEffect(()=>{
    localStorage.setItem('todo',JSON.stringify(todo))
  },[todo]);
  const addTask=():void=>{
    const newTask ={
      id:Date.now(),
      taskName:task,
      deadline:deadline,
    };
      settodo([...todo,newTask]);
      setTask("");
      setdeadline(0);
  }
  const removeTask=(taskNameToDelete:number):void=>{
    settodo(todo.filter((task)=>{
      return task.id !== taskNameToDelete;
    }))
  }
  return (
    <div className="App">
      <div className='header'>
        <div className='input-container'>
        <input type='text' name='task' value={task} placeholder='Task...' onChange={handleChange}/>
        <input type='number' name='deadline' value={deadline} placeholder='Deadline In Days...' onChange={handleChange}/>
        </div>
        <button className='btn btn-primary' onClick={addTask}>Add Task</button>
      </div>
      <div className='todoList'>
        {todo.map((task:ITask , key:number)=>{
          return <Todotask key={key} task={task} removeTask={removeTask}/>
        })}
      </div>
    </div>
  );
}
export default App;
