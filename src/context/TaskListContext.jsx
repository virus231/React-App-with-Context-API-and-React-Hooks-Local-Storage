import React, { createContext, useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid'

export const TaskListContext = createContext()

const TaskListContextProvider = props => {
    const initialState = JSON.parse(localStorage.getItem("tasks"))  || []

    const [tasks, setTasks ] = useState(initialState)

    const [editItem, setEditItem] = useState(null)

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])


    //Добавляємо Таску
    const addTask = title => {
        setTasks([...tasks, {title, id: uuidv4()}])
    }

    // Видаляємо таску
    const removeTask = id => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    // Очищуємо список задач
    const clearList = () => {
        setTasks([])
    }

    // Шукаємо яку задачу хочемо відредагувати по id
    const findItem = id => {
        const item = tasks.find(task => task.id === id)

        console.log("edititem", item)
        setEditItem(item)
    }

    // Відредаговану задачу зберігаємо в масив задач
    const editTask = (title, id) => {
        const newTask = tasks.map(task => (task.id === id) ? {title, id} : task)

        console.log(newTask)

        setTasks(newTask)
        setEditItem(null)
    }

    return (
        <TaskListContext.Provider value={{tasks, addTask, removeTask, clearList, findItem, editTask, editItem}}>
            {props.children}
        </TaskListContext.Provider>
    )
}

export default TaskListContextProvider
