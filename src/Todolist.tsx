import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
                <IconButton
                    onClick={removeTodoListHandler}
                    size={"small"}
                >
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <div>
                {props.tasks.map(t => {

                    const onRemoveHandler = () => props.removeTask(t.id, props.id)

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(newValue, t.id, props.id)
                    }
                    return (
                        <div className={t.isDone ? "is-done" : ""} key={t.id}>

                            <Checkbox
                                onChange={onChangeStatusHandler}
                                checked={t.isDone}
                                size='small'
                            />

                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>

                            <IconButton
                                onClick={onRemoveHandler}
                                aria-label="delete"
                                color={"secondary"}
                            >
                                <Delete/>
                            </IconButton>
                        </div>
                    )
                })}
            </div>
            <div>
                <Button
                    variant={props.filter === "all" ? "outlined" : "text"}
                    onClick={onAllClickFilter}
                >All
                </Button>
                <Button
                    variant={props.filter === "active" ? "outlined" : "text"}
                    color='success'
                    onClick={onActiveClickFilter}
                >Active
                </Button>
                <Button
                    variant={props.filter === "completed" ? "outlined" : "text"}
                    color='secondary'
                    onClick={onCompletedClickFilter}
                >Completed
                </Button>
            </div>
        </div>
    )
}


