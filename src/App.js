import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import uuid from "react-uuid";
import Header from "./components/Header/Header";
import Tasks from "./components/Tasks/Tasks";
import Form from "./components/Form/Form";
import Help from "./components/Help";
import HelpIntro from "./components/Help/Intro";
import HelpAdd from "./components/Help/Adding";
import HelpRemove from "./components/Help/Removing";
import HelpChange from "./components/Help/Changing";
import NotFound from "./components/NotFound/NotFound";
import Loading from "./components/Loading";

import * as database from "./database";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState('');

  useEffect(() =>{
    (async () => {
      
      //load the database
      const data = await database.load();
      setIsLoading(false);
      setTasks(data);
      if(data.length === 0){
        setIsEmpty('There are no tasks, Please add some');
      }else{
        setIsEmpty('');
      }
    })(); 
  });//empty array calls the useEffect once


  // Sets the initial state.
  const [tasks, setTasks] = useState([]);

  // Removes all tasks form the list.
  const handleClearTasks = async () => {

    for(var i = 0; i < tasks.length; i++){
      //remove from database
      const removed = await database.remove(tasks[i].id);
      if(!removed){
        alert('Failed to remove post.');
      }
    }
   

    setTasks([]);
  }

  // Toggles a task status.
  const handleStatusChange = async (id) => {
    const updatedTasks = [...tasks];
    updatedTasks.forEach(async (task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
    });
    setTasks(updatedTasks);
  }

  // Removes a task from the list.
  const handleTaskRemove = async (id) => {
    const filteredTasks = tasks.filter(
      (task) => task.id !== id
    );
    setTasks(filteredTasks);
  }

  // Adds a task.
  const handleAddTask = (description, status) => {
    setTasks([
      ...tasks,
      {
        id: uuid(),
        description: description,
        done: status
      }
    ]);
  }

  return (
    <>
      <Header />
      {isLoading ?
      (

       <Loading/>
      )
      
      :(
      
      <main className="page">
        <div>{isEmpty}</div>
        {/* Set the app routes */}
        <Routes>
          <Route path="/" element={
            <Tasks 
              tasks={tasks}
              onStatusChange={handleStatusChange}
              onTaskRemove={handleTaskRemove}
              onClearTasks={handleClearTasks}
            />
          } />

          <Route path="/add" element={
            <Form
              onAddTask={handleAddTask}
            />
          } />

          <Route path="/help" element={<Help />}>
            <Route path="" element={<HelpIntro />} />
            <Route path="add" element={<HelpAdd />} />
            <Route path="remove" element={<HelpRemove />} />
            <Route path="change" element={<HelpChange />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      )
      }
      
    </>
  );
}

export default App;
