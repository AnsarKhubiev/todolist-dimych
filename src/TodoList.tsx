import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {FilterVulesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterVulesType) => void
    addTask: (title: string) => void
}

export function TodoList({title, tasks, removeTask, changeFilter, addTask}: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState<string>("");

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value);
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask(newTaskTitle);
            setNewTaskTitle('');
        }
    }

    const addTaskHandler = () => {
        addTask(newTaskTitle);
        setNewTaskTitle('');
    }

    const onAllClickHandler = () => changeFilter('all');
    const onActiveClickHandler = () => changeFilter('active');
    const onCompletedClickHandler = () => changeFilter('completed');


    return (
        <div>
            <h3>{title}</h3>

            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <Button title="+" onClick={addTaskHandler}/>
            </div>

            <ul>
                {tasks.map(t => {
                    const onRemoveHandler = () => removeTask(t.id);
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button title='x' onClick={onRemoveHandler}/>
                        </li>
                    )
                })}
            </ul>

            <div>
                <Button title={'All'} onClick={onAllClickHandler}/>
                <Button title={'Active'} onClick={onActiveClickHandler}/>
                <Button title={'Completed'} onClick={onCompletedClickHandler}/>
            </div>
        </div>
    )
}