import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import './Form.scss';
import * as database from "../../database";
//import the database write


function Form({ onAddTask }) {
  const [description, setDescription] = useState('');
  const [done, setDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  

  const handleFormSubmission = async (event) => {
    event.preventDefault();

    // Validate the user input.
    if (description === '') {
      setErrorMessage('Enter a description.');
    }
    else {

      // Add the task.
      onAddTask(description, done);
      const data = {description: description, done: done};
      setIsSaving(true);
      const savedId = await database.save(data);
      setIsSaving(false);
      

      if(savedId){
      setShowSuccess('Data Has been saved');
      console.log('Saved Id', savedId);
      // Reset the form state.
      setDescription('')
      setDone(false);

      }else{
        setErrorMessage('Failed To save data');
      }
      
    }
  }

  if (isSaving){
    return(
      <div>Saving...</div>
    );
  }
  return (
    <form className='form-component' onSubmit={handleFormSubmission}>
      <h1>New Task</h1>

      <div className='content'>
        {/* Conditional render of the error message */}
        {errorMessage !== '' && (
          <div className='error-message'>{errorMessage}</div>
        )}
         {showSuccess !== '' && (
          <div className='success-message'>{showSuccess}</div>
        )}

        {/* Description Field */}
        <label>
          <span>Description:</span>
          <input
            type='text'
            maxLength={150}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>

        {/* Status Field */}
        <label>
          <span>Status:</span>
          <select
            value={done}
            onChange={(event) => setDone(event.target.value)}
          >
            <option value={false}>Open</option>
            <option value={true}>Completed</option>
          </select>
        </label>

        {/* Submission Button */}
        <button>
          <IoMdAddCircle /> Add
        </button>
      </div>
    </form>
  );
}

export default Form;