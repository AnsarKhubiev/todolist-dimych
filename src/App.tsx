import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

export type FilterVulesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterVulesType>('all')

    const changeFilter = (filter: FilterVulesType) => {
        setFilter(filter)
    }

    if (filter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
    }

    switch (filter) {
        case "completed":
            tasks = tasks.filter(t => t.isDone)
            break
        case "active":
            tasks = tasks.filter(t => !t.isDone)
            break
    }

    const removeTask = (taskId: number) => {
        const resultTasks = tasks.filter(t => t.id !== taskId);
        setTasks(resultTasks)
    }


    return (
        <div className="App">
            <TodoList title={'What to Learn'}
                      tasks={tasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
