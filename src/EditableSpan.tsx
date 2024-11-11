import React, {ChangeEvent, useState} from "react";
import {Input} from "@mui/material";

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode ?
            <Input
                value={title}
                onBlur={activateViewMode}
                autoFocus
                onChange={onChangeTitleHandler}
            /> :
            <span onDoubleClick={activateEditMode}>{props.title} </span>
    )
}