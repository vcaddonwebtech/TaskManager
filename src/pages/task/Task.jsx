import React, { useEffect, useState } from 'react';
import { CheckSquare, Calendar, AlertCircle, Trash2, Edit } from 'lucide-react';
import { supabase } from '../auth/supabase_client';
const Task = () => {

    // const [tasks, setTasks] = useState(() => {
    //     const storedTasks = localStorage.getItem("tasks");
    //     return storedTasks ? JSON.parse(storedTasks) : [];
    // });
    const [tasks, setTasks] = useState([])

    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        status: 'Pending',
        priority: 'Low'
    });

    // useEffect(() => {
    //     localStorage.setItem("tasks", JSON.stringify(tasks));
    // }, [tasks]);

    const resetForm = () => {
        setFormData({
            title: '',
            date: '',
            status: 'Pending',
            priority: 'Low'
        });
        setEditingTask(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-700';
            case 'In Progress': return 'bg-blue-100 text-blue-700';
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'text-red-500';
            case 'Medium': return 'text-orange-500';
            case 'Low': return 'text-green-500';
            default: return 'text-gray-500';
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.date) return;

        if (editingTask) {
            // setTasks(tasks.map(task =>
            //     task.id === editingTask.id
            //         ? { ...formData, id: editingTask.id }
            //         : task
            // ));
            const { data, error } = await supabase.from('taskTable')
                .update(formData)
                .eq("id", editingTask.id)
                .select()
                .single();
        } else {
            const { data, error } = await supabase
                .from("taskTable")
                .insert([{ ...formData }])
                .select()
                .single();
            console.log(data, error);
        }

        resetForm();
        setShowModal(false);
    };



    const handleEdit = (task) => {
        setEditingTask(task);
        setFormData(task);
        setShowModal(true);
    };

    const handleDelete = async(id) => {
        // setTasks(tasks.filter(task => task.id !== id));
        const {data, error} = await supabase.from('taskTable').delete().eq("id",id)
        
    };

    useEffect(() => {
        const taskchannel = supabase.channel("taskchannel")
            .on(
                'postgres_changes',
                { event: "*", schema: 'public', table: 'taskTable' },
                (payload) => {
                    const { eventType, new: newTask, old } = payload;

                    setTasks((prev) => {
                        if (eventType === "INSERT") {
                            return [...prev, newTask];
                        }

                        if (eventType === "UPDATE") {
                            return prev.map(task =>
                                task.id === newTask.id ? newTask : task
                            );
                        }

                        if (eventType === "DELETE") {
                            return prev.filter(task =>
                                task.id !== old.id
                            );
                        }

                        return prev;
                    });
                }
            )
            .subscribe()
        return () => {
            supabase.removeChannel(taskchannel)
        }
    }, [])

    useEffect(() => {
        const fetchTasks = async () => {
            const { data, error } = await supabase
                .from("taskTable")
                .select("*")

            if (!error) {
                setTasks(data)
            }
        }

        fetchTasks()
    }, [])

    return (
        <div className="space-y-6 relative">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-(--text-color)">Tasks</h2>
                    <p className="text-gray-500 text-sm">
                        Manage and track your team tasks
                    </p>
                </div>

                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="bg-(--primary-color) cursor-pointer text-white px-5 py-2.5 rounded-xl font-medium hover:opacity-90 transition shadow-lg">
                    + Add New Task
                </button>
            </div>

            {/* Task List */}
            <div className="grid grid-cols-1 gap-4">
                {tasks.length === 0 && (
                    <div className="text-center text-gray-400 py-10">
                        No tasks available. Add your first task
                    </div>
                )}

                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="bg-(--bg-color) p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300 group"
                    >
                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-purple-50 text-(--primary-color) group-hover:bg-(--primary-color) group-hover:text-white transition duration-300">
                                    <CheckSquare size={20} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-(--text-color)">
                                        {task.title}
                                    </h3>

                                    <div className="flex items-center gap-3 mt-1">
                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                            <Calendar size={12} />
                                            {task.date}
                                        </div>

                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                            <AlertCircle
                                                size={12}
                                                className={getPriorityColor(task.priority)}
                                            />
                                            {task.priority} Priority
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                    {task.status}
                                </span>

                                <button
                                    onClick={() => handleEdit(task)}
                                    className="p-2 text-green-500 cursor-pointer hover:bg-green-50 rounded-lg transition">
                                    <Edit size={16} />
                                </button>

                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="p-2 text-red-500 cursor-pointer hover:bg-red-50 rounded-lg transition">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-(--card-color) p-6 rounded-2xl w-full max-w-md space-y-4 shadow-xl">

                        <h3 className="text-lg font-semibold">
                            {editingTask ? "Edit Task" : "Add New Task"}
                        </h3>

                        <input
                            type="text"
                            name="title"
                            placeholder="Task Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="text-(--primary-color) w-full border rounded-lg p-2"
                        />

                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="text-(--primary-color) w-full border rounded-lg p-2"
                        />

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="text-(--primary-color) w-full border rounded-lg p-2 bg-(--active-color)">
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>

                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="text-(--primary-color) w-full border rounded-lg p-2 bg-(--active-color)">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    resetForm();
                                }}
                                className="px-4 py-2 cursor-pointer rounded-lg border">
                                Cancel
                            </button>

                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 cursor-pointer rounded-lg bg-(--primary-color) text-white">
                                {editingTask ? "Update" : "Add"}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Task;
