import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import styled, { css } from "styled-components";

import Task from "models/Task";
import EditIcon from './edit-2-fill.png';
import DeleteIcon from './delete-bin-2-fill.png';
import ConfirmIcon from './checkbox-circle-fill.png';
import UndoIcon from './arrow-go-back-fill.png';

const ItemWraper = styled.div`
    border: 1px solid #d1d5db;
    display: flex;
    padding: 12px 12px;
    margin: 12px 12px 0;
    border-radius: 4px;
    align-items: center;
    @media only screen and (min-width: 1280px) {
        margin: 16px 12px 0;
    }
`

const Checkbox = styled.input`
    margin: 0 8px 0 0;
    cursor: pointer;
`

interface TaskValueProp {
    readonly isCompleted: boolean
}

const TaskValue = styled.p<TaskValueProp>`
    color: #27272a;
    flex-grow: 1;
    margin-right: 20px;
    transition: all 0.2s ease;
    ${props => props.isCompleted && css`
        text-decoration: line-through;
        color: #e11d48;
    `}
`

const TaskValueInput = styled.input`
    width: 100%;
    margin-right: 20px;
    border: none;
    border-bottom: 1px solid #d1d5db;
    text-indent: 4px;
    line-height: 24px;
    transition: all 0.2s ease;
    &:focus {
        outline: none;
        border-color: #e11d48;
    }
`

const ActionIcon = styled.img`
    width: 24px;
    height: 24px;
    padding: 2px;
    cursor: pointer;
    box-sizing: border-box;
    margin-left: 8px;
`

interface TodoItemProp {
    task: Task,
    index: number,
    handleChangeCompletedStatus: (index: number, isCompleted: boolean) => void,
    handleEditTask: (index: number, isEditing: boolean) => void
    handleChangeTask: (index: number, value: string) => void
    handleDeleteTask: (index: number, task: Task) => void
}

const TodoItem:FC<TodoItemProp> = ({
    task,
    index,
    handleChangeCompletedStatus,
    handleEditTask,
    handleChangeTask,
    handleDeleteTask
}) => {
    const [editedValue, setEditedValue] = useState(task.value);

    function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
        setEditedValue(event.target.value);
    }

    function handleSaveEditTask(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            handleChangeTask(index, editedValue);
        }
    }

    function handleUndoChange() {
        setEditedValue(task.value);
        handleEditTask(index, false);
    }

    return (
        <ItemWraper>
            <Checkbox
                type="checkbox"
                title="Mark as done"
                checked={task.isCompleted}
                onChange={handleChangeCompletedStatus.bind(this, index, !task.isCompleted)} />
            {
                task.isEditing
                    ? <>
                        <TaskValueInput
                            autoFocus
                            type="text"
                            value={editedValue}
                            onChange={handleChangeInput}
                            onKeyDown={handleSaveEditTask} />
                            <ActionIcon src={ConfirmIcon} title="Save change" onClick={handleChangeTask.bind(this, index, editedValue)} />
                            <ActionIcon src={UndoIcon} title="Undo" onClick={handleUndoChange} />
                    </>
                    : <>
                        <TaskValue isCompleted={task.isCompleted}>{task.value}</TaskValue>
                        <ActionIcon src={EditIcon} title="Edit task" onClick={handleEditTask.bind(this, index, !task.isEditing)} />
                        <ActionIcon src={DeleteIcon} title="Delete task" onClick={handleDeleteTask.bind(this, index, task)} />
                    </>
            }
        </ItemWraper>
    )
}

export default TodoItem;
