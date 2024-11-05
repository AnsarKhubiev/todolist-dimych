import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (value: string, id: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (title: string, taskId: string, id: string) => void
    changeTodolistTitle: (title: string, id: string) => void
    removeTodoList: (todoListId: string) => void
    filter: FilterValuesType
}

export function Todolist(props: TodolistPropsType) {

    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }

    const onAllClickFilter = () => props.changeFilter("all", props.id)
    const onActiveClickFilter = () => props.changeFilter("active", props.id)
    const onCompletedClickFilter = () => props.changeFilter("completed", props.id)

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodoListHandler}>x</button>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {props.tasks.map(t => {

                    const onRemoveHandler = () => props.removeTask(t.id, props.id)

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(newValue, t.id, props.id)
                    }
                    return (
                        <li className={t.isDone ? "is-done" : ""} key={t.id}>
                            <input onChange={onChangeStatusHandler} type="checkbox" checked={t.isDone}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickFilter}
                >All
                </button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickFilter}
                >Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickFilter}
                >Completed
                </button>
            </div>
        </div>
    )
}


