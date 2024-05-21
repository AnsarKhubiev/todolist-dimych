import React from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (value: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export function Todolist({title, tasks, removeTask, changeFilter}: TodolistPropsType) {
    const tasksList = tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => removeTask(t.id)}>x</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{title}</h3>

            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={()=>changeFilter("all")}>All</button>
                <button onClick={()=>changeFilter("active")}>Active</button>
                <button onClick={()=>changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}