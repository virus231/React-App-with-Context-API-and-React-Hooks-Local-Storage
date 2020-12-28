import React, {useContext, useState, useEffect} from 'react'
import {TaskListContext} from "../context/TaskListContext";

const TaskForm = () => {
    const {addTask, clearList, editTask, editItem} = useContext(TaskListContext)

    const [title, setTitle]= useState("") // Імя задачі


    const handleChange = e => {
        setTitle(e.target.value)
        console.log(title)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(!editItem) {
            addTask(title)
            setTitle("")
        } else {
            editTask(title, editItem.id)
        }
    }

    useEffect(() => {
        if(editItem !== null) {
            setTitle(editItem.title)
        } else {
            setTitle("")
        }
    }, [editItem]);

    return (
        <form onSubmit={handleSubmit} className="form">
            <input
                onChange={handleChange}
                value={title}
                className="task-input"
                placeholder="Add task..."
                type="text"
                required
            />
            <div className="buttons">
                <button type="submit" className="btn add-task-btn">
                    {editItem ? "Edit Task" : "Add Task"}
                </button>
                <button onClick={clearList} className="btn clear-btn">Clear</button>
            </div>
        </form>
    )
}

export default TaskForm;
