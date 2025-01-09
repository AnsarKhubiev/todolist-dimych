export type StateType = {
    age: number
    childrenCount: number
    name: string
}

type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE' :
            return {...state, age: state.age + 1};

        case 'INCREMENT-CHILDREN-COUNT' :
            return {...state, childrenCount: state.childrenCount + 1}

        case 'CHANGE_NAME' :
            return {...state, name: action['newName']}

        default:
            throw new Error("I don't understand this action type")
    }
}

// export type RemoveTodoListActionType = {
//     type: 'REMOVE-TODOLIST',
//     id: string
// }
// export type AddTotodlistActionType = {
//     type: 'ADD-TODOLIST',
//     title: string
// }
// export type ChangeTotodlistTitleActionType = {
//     type: 'CHANGE-TODOLIST-TITLE',
//     title: string
//     id: string
// }
// export type ChangeTotodlistFilterActionType = {
//     type: 'CHANGE-TODOLIST-FILTER',
//     id: string
//     filter: FilterValuesType
// }
//
// type ActionTypes =
//     RemoveTodoListActionType
//     | AddTotodlistActionType
//     | ChangeTotodlistFilterActionType
//     | ChangeTotodlistTitleActionType