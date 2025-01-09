import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodoListType[], action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST' :
            return state.filter(t => t.id !== action.payload.todolistId)

        case 'ADD_TODOLIST' :
            return [...state, {id: v1(), title: action.payload.title, filter: 'all'}]

        case 'CHANGE_TODOLIST_TITLE' : {
            const {todolistId, title} = action.payload
            return state.map(td => td.id === todolistId ? {...td, title} : td)
        }

        case 'CHANGE_TODOLIST_FILTER' : {
            const {todolistId, newFilterValue} = action.payload
            return state.map(td => td.id === todolistId ? {...td, filter: newFilterValue} : td)
        }

        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE_TODOLIST', payload: {todolistId}} as const
}

export const addTodolistAC = (title: string) => {
    return {type: 'ADD_TODOLIST', payload: {title}} as const
}

export const changeTodolistTitleAC = (payload: { todolistId: string, title: string }) => {
    return {type: 'CHANGE_TODOLIST_TITLE', payload} as const
}

export const changeTodolistFilterAC = (payload: { todolistId: string, newFilterValue: FilterValuesType }) => {
    return {type: 'CHANGE_TODOLIST_FILTER', payload} as const
}

export type RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>
export type AddTotodlistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTotodlistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTotodlistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType =
    RemoveTodoListActionType
    | AddTotodlistActionType
    | ChangeTotodlistFilterActionType
    | ChangeTotodlistTitleActionType