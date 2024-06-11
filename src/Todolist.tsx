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
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: TodolistPropsType) {
    const {title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter} = props

    const [newTaskTitle, setNewTaskTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim().length) {
            addTask(newTaskTitle.trim())
            setNewTaskTitle("")
        } else {
            setError("Field is required")
            setNewTaskTitle("")
        }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addTask(newTaskTitle.trim())
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
                    className={error ? "error" : ""}
                />

                <button onClick={addTaskHandler}>+</button>

                {error && <div className="error-message">Field is required</div>}
            </div>
            <ul>
                {tasks.map(t => {
                    const onRemoveHandler = () => removeTask(t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(t.id, e.currentTarget.checked)
                    }
                    return (
                        <li className={t.isDone ? 'is-done' : ""} key={t.id}>
                            <input onChange={onChangeHandler} type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button
                    className={filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickFilter}
                >All
                </button>
                <button
                    className={filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickFilter}
                >Active
                </button>
                <button
                    className={filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickFilter}
                >Completed
                </button>
            </div>
        </div>
    )
}