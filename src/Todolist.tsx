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
    removeTask: (value: string, id: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    todoListId: string
    removeTodoList: (todoListId: string) => void
}

export function Todolist(props: TodolistPropsType) {
    const {title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter, todoListId, removeTodoList} = props

    const [newTaskTitle, setNewTaskTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const removeTodoListHandler = () => {
        removeTodoList(todoListId)
    }

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim().length) {
            addTask(newTaskTitle.trim(), todoListId)
            setNewTaskTitle("")
        } else {
            setError("Field is required")
            setNewTaskTitle("")
        }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addTask(newTaskTitle.trim(), todoListId)
    }


    const onAllClickFilter = () => changeFilter("all", todoListId)
    const onActiveClickFilter = () => changeFilter("active", todoListId)
    const onCompletedClickFilter = () => changeFilter("completed", todoListId)

    return (
        <div>
            <h3>{title} <button onClick={removeTodoListHandler}>x</button></h3>

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
                    const onRemoveHandler = () => removeTask(t.id, todoListId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(t.id, e.currentTarget.checked, todoListId)
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