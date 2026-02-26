import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addTask } from '../../features/taskSlice'

const Project = () => {

  const dispatch = useDispatch();
  const tasks = useSelector(state => state.taskdata.tasks || []);

  const [form, setFormdata] = useState({
    name: "",
    description: "",
  });

  const addtask = (e) => {
    e.preventDefault();

    dispatch(addTask(form));

    setFormdata({
      name: "",
      description: "",
    });
  };

  return (
    <>
    </>
  );
}

export default Project;