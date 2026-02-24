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
    <div>
      <form onSubmit={addtask}>

        <input
          type="text"
          placeholder="name"
          value={form.name}
          onChange={(e) =>
            setFormdata({ ...form, name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="description"
          value={form.description}
          onChange={(e) =>
            setFormdata({ ...form, description: e.target.value })
          }
        />

        <button type="submit">Submit</button>
      </form>

      {tasks && (tasks.map((items, index) => (
        <div key={index}>{items.name}</div>
      )))}
    </div>
  );
}

export default Project;