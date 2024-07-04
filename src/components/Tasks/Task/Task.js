import './Task.scss';
import { MdOutlineDeleteSweep } from "react-icons/md";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import * as database from "../../../database";


function Task(props) {

  // Toggles the task status.
  const handleStatusClick = async () => {
    const id = props.task.id;
    props.onStatusChange(id);

    const data = {done: props.task.done};
        const updated = await database.update(id, data);
        console.log('Updated: ', updated);
        
        if(!updated){
          alert('Failed to update');
    
      }

  }

  // Removes the task.
  const handleRemoveClick = async () => {
    const id = props.task.id;
    props.onTaskRemove(id);

    //remove from database
    const removed = await database.remove(id);
    if(!removed){
      alert('Failed to remove post.');
    }
  }

  return (
    <div className='task-component'>
      <div className='content'>
        <h3>{props.task.description}</h3>
        <div className='id'>Id: {props.task.id}</div>
        <div className='status'>
          Status:
          {props.task.done
            ? <u>Completed</u>
            : <i>Open</i>
          }
        </div>
      </div>
      
      {/* Buttons */}
      <div className='control'>
        <button onClick={handleStatusClick} className='status'>
          {props.task.done
            ? <BsToggleOn />
            : <BsToggleOff />
          }
          Change Status
        </button>
        <button onClick={handleRemoveClick} className='remove'>
          <MdOutlineDeleteSweep />Remove Task
        </button>
      </div>
    </div>
  );
}

export default Task;
