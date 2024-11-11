import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

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
            <TextField
                label={'type value'}
                size='small'
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                helperText={error}
            />

            <IconButton
                onClick={addTask}
                color={"primary"}
            >
                <ControlPoint/>
            </IconButton>

        </div>
    )
}