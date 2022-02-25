import { ChangeEvent, FC, FormEvent } from "react";
import styled from 'styled-components';

import TaskImg from './file-list-fill.png';
import Card from 'components/_shareds/Card';
import HeaderTitle from "components/_shareds/HeaderTitle";

const InputWraper = styled.div`
    display: flex;
    align-items: center;
    margin: 16px 12px;
    @media only screen and (min-width: 768px) {
        margin: 24px 12px;
    }
`

const Input = styled.input`
    width: calc(100% - 24px);
    line-height: 24px;
    padding: 0;
    border: 1px solid #d1d5db;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-left: none;
    padding: 0 8px;
    font-size: 12px;
    transition: all 0.2s ease;
    &:focus {
        border-color: #e11d48;
        outline: none;
    }
    @media only screen and (min-width: 768px) {
        line-height: 28px;
        font-size: 14px;
    }
    @media only screen and (min-width: 1280px) {
        line-height: 36px;
        font-size: 16px;
    }
`

const Icon = styled.img`
    padding: 6px;
    box-sizing: border-box;
    width: 26px;
    height: 26px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    background-color: #e11d48;
    color: white;
    border: none;
    @media only screen and (min-width: 768px) {
        padding: 8px;
        width: 30px;
        height: 30px;
    }
    @media only screen and (min-width: 1280px) {
        padding: 10px;
        width: 38px;
        height: 38px;
    }
`

const Button = styled.button`
    width: calc(100% - 24px);
    margin: 0 12px;
    border: none;
    background-color: #e11d48;
    color: white;
    border-radius: 4px;
    line-height: 24px;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    @media only screen and (min-width: 768px) {
        line-height: 28px;
        font-size: 14px;
    }
    @media only screen and (min-width: 1280px) {
        line-height: 36px;
        font-size: 16px;
    }
`

interface TodoInputProp {
    inputTask: string,
    setInputTask: (value: string) => void,
    handleAddTask: () => void
}

const TodoInput:FC<TodoInputProp> = ({
    inputTask,
    setInputTask,
    handleAddTask
}) => {
    function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
        setInputTask(event.target.value);
    }

    function handleSubmitTask(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    return (
        <Card>
            <form onSubmit={handleSubmitTask}>
                <HeaderTitle  title="Create new task"/>
                <InputWraper>
                    <Icon src={TaskImg} />
                    <Input
                        placeholder="Enter your task"
                        type="text"
                        value={inputTask}
                        onChange={handleChangeInput} />
                </InputWraper>
                <Button type="submit" onClick={handleAddTask}>Add Task</Button>
            </form>
        </Card>
    )
}


export default TodoInput;
