import React, {useState} from "react";
import "./App.css";
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

type todoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [tasks, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
        ],
    })

    const [todoLists, setTodoLists] = useState<todoListType[]>([
        {id: todoListId1, title: "What to learn", filter: "active"},
        {id: todoListId2, title: "What to buy", filter: "completed"},
    ])


    function removeTask(id: string, todoListId: string) {
        const resultTasks = tasks[todoListId].filter(t => t.id !== id);
        setTasks({...tasks, resultTasks});
    }

    function removeTodoList (todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        setTodoLists(todoLists.map(tl => (tl.id === todoListId ? {...tl, filter: value} : tl)))
    }

    function addTask(title: string, todoListId: string) {
        const newTask = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks({...tasks, todoListId: [newTask, ...tasks[todoListId]]})
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(
            t => t.id === taskId ? {id: t.id, title: t.title, isDone: isDone} : t
            )})
    }


    return (
        <div className="App">

            {todoLists.map(tl => {
                let tasksForTodolist = tasks[tl.id];

                if (tl.filter === "completed") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                }
                if (tl.filter === "active") {
                    tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
                }
                return (
                    <Todolist
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                )
            })}
        </div>
    );
}

export default App;
