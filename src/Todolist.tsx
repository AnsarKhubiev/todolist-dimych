import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (value: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist({title, tasks, removeTask, changeFilter, addTask}: TodolistPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("")

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        addTask(newTaskTitle)
        setNewTaskTitle("")
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addTask(newTaskTitle)
    }

    const onAllClickFilter = () => changeFilter("all")
    const onActiveClickFilter = () => changeFilter("active")
    const onCompletedClickFilter = () => changeFilter("completed")

    return (
        <div>
            <h3>{title}</h3>

            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {tasks.map(t => {
                    const onRemoveHandler = () => removeTask(t.id)
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickFilter}>All</button>
                <button onClick={onActiveClickFilter}>Active</button>
                <button onClick={onCompletedClickFilter}>Completed</button>
            </div>
        </div>
    )
}