import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormType) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        e.key === "Enter" && addTask()
    }

    const addTask = () => {
        if (title.trim().length) {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError("Field is required")
            setTitle("")
        }
    }

    return (
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? "error" : ""}
            />

            <button onClick={addTask}>+</button>

            {error && <div className="error-message">Field is required</div>}
        </div>
    )
}