import React, {useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState<TaskType[]>(
        [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ]
    );

    const [filter, setFilter] = useState<FilterValuesType>("all")

    let tasksForTodolist = tasks;
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    function removeTask(id: string) {
        const resultTasks = tasks.filter(t => t.id !== id);
        setTasks(resultTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    function addTask(title: string) {
        const newTask = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    function changeTaskStatus(taskId: string, isDone: boolean) {
        setTasks(tasks.map(t => t.id === taskId ? {id: t.id, title: t.title, isDone: isDone} : t))
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
