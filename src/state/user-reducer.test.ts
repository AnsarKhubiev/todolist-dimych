import {StateType, userReducer} from "./user-reducer";

let startState: StateType

beforeAll(() => {
    startState = {age: 20, childrenCount: 2, name: 'Dimych'};
})

describe('user tests:', () => {
    test('user reducer should increment only age', () => {

        const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

        expect(endState.age).toBe(21);
        expect(endState.childrenCount).toBe(2);
    })

    test('user reducer should increment only childrenCount', () => {
        const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

        expect(endState.childrenCount).toBe(3)
    })

    test('user reducer should change name of user', () => {
        const endState = userReducer(startState, {type: 'CHANGE_NAME', newName: 'Ansar'})
        expect(endState.name).toBe('Ansar')
    })
})