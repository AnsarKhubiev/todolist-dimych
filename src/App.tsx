import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterVulesType = 'all' | 'active' | 'completed'

function App() {

    //tasks state
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ])

    //filters state
    const [filter, setFilter] = useState<FilterVulesType>('all')

    switch (filter) {
        case "completed":
            tasks = tasks.filter(t => t.isDone)
            break
        case "active":
            tasks = tasks.filter(t => !t.isDone)
            break
    }

    const removeTask = (taskId: string) => {
        const resultTasks = tasks.filter(t => t.id !== taskId);
        setTasks(resultTasks)
    }

    const changeFilter = (filter: FilterVulesType) => {
        setFilter(filter)
    }

    const addTask = (title: string)=> {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <TodoList title={'What to Learn'}
                      tasks={tasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
