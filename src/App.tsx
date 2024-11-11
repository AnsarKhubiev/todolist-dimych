import React, {useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid2, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export type FilterValuesType = "all" | "active" | "completed"

type todoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [tasks, setTasks] = useState<TasksStateType>({
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
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ])

    function addTodoList(title: string) {
        const newTodoList: todoListType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoList.id]: []})
    }

    function removeTask(id: string, todoListId: string) {
        const resultTasks = tasks[todoListId].filter(t => t.id !== id);
        setTasks({...tasks, [todoListId]: resultTasks});
        console.log(tasks)
    }

    function removeTodoList(todoListId: string) {
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
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].map(
                t => t.id === taskId ? {id: t.id, title: t.title, isDone: isDone} : t
            )
        })
    }

    function changeTaskTitle(newTitle: string, taskId: string, todoListId: string) {
        let newTask = tasks[todoListId].find(t => t.id === taskId)
        if (newTask) newTask.title = newTitle

        setTasks({...tasks, [todoListId]: [...tasks[todoListId]]})
    }

    function changeTodolistTitle(newTitle: string, todoListId: string) {
        let changedTodolist = todoLists.find(tl => tl.id === todoListId)
        if (changedTodolist) {
            changedTodolist.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid2 container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid2>

                <Grid2 container spacing={3}>
                    {todoLists.map(tl => {
                        let tasksForTodolist = tasks[tl.id];

                        if (tl.filter === "completed") {
                            tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                        }
                        if (tl.filter === "active") {
                            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
                        }
                        return (
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                    filter={tl.filter}
                                    removeTodoList={removeTodoList}
                                />
                            </Paper>
                        )

                    })}
                </Grid2>
            </Container>

        </div>
    );
}

export default App;
