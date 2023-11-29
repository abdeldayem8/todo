import React from 'react'
import { ITask } from '../../interfaces';

interface props{
    task:ITask;
    removeTask(taskNameToDelete:number):void;
}
const Todotask=({task,removeTask}:props)=> {
  return <div className='container'>
  <div className='task'>
     <div className='content'>
      <span>{task.taskName}</span>
      <span>{task.deadline}</span>
     </div>
     <button className='btn btn-outline-success' onClick={()=>{removeTask(task.id)}}>Remove</button>
    </div>
    </div>
}
export default Todotask;