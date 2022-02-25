import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import _cloneDeep from 'lodash/cloneDeep'

import Task from 'models/Task';
import TodoInput from './components/TodoInput/';
import TodoList from './components/TodoList';
import TodoItem from "components/TodoList/TodoItem";
import FilterOption from "models/FilterOption";

const AppWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    padding: 12px 8px;
    @media only screen and (min-width: 768px) {
        padding: 24px 0;
    }
    @media only screen and (min-width: 1280px) {
        padding: 40px 0;
    }
`

const AppHeading = styled.h1`
    font-size: 24px;
    line-height: 1.5;
    font-weight: bold;
    margin-bottom: 12px;
    color: #e11d48;
    @media only screen and (min-width: 768px) {
        margin-bottom: 20px;
        font-size: 28px;
    }
`

const Divider = styled.div`
    height: 1px;
    width: 100%;
    max-width: 512px;
    background-color: #d1d5db;
    margin: 20px 0;
`

const App: FC = () => {
    const [inputTask, setInputTask] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<FilterOption>(FilterOption.ALL);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([])

    useEffect(() => {
        const taskList = localStorage.getItem('tasks');
        if (taskList) {
            setTasks(JSON.parse(taskList));
        }
    }, []);

    useEffect(() => {
        switch (filter) {
            case FilterOption.COMPLETED:
                const completedTasks = tasks.filter(task => task.isCompleted);
                setFilteredTasks(completedTasks);
                break;
            case FilterOption.INCOMPLETED:
                const inCompletedTask = tasks.filter(task => !task.isCompleted);
                setFilteredTasks(inCompletedTask);
                break;
            default:
                setFilteredTasks(tasks);
                break;
        }
    }, [filter, tasks]);

    function handleAddTask() {
        const newTaskList = [
            ...tasks,
            {
                id: (+ new Date()).toString(),
                value: inputTask,
                isCompleted: false,
                isEditing: false
            }
        ];
        setTasks(newTaskList);
        localStorage.setItem('tasks', JSON.stringify(newTaskList));
        setInputTask('');
    }

    function handleChangeCompletedStatus(index: number, isCompleted: boolean) {
        let taskList = _cloneDeep(tasks);
        if (taskList[index]) {
            taskList[index].isCompleted = isCompleted;
            setTasks(taskList);
            localStorage.setItem('tasks', JSON.stringify(taskList));
        }
    }

    function handleEditTask(index: number, isEditing: boolean) {
        let taskList = _cloneDeep(tasks);
        if (taskList[index]) {
            taskList[index].isEditing = isEditing;
            setTasks(taskList);
        }
    }

    function handleChangeTask(index:number, value: string) {
        let taskList = _cloneDeep(tasks);
        if (taskList[index]) {
            taskList[index].value = value;
            taskList[index].isEditing = false;
            setTasks(taskList);
            localStorage.setItem('tasks', JSON.stringify(taskList));
        }
    }

    function handleDeleteTask(index: number, task: Task) {
        const acceptDelete = window.confirm(`Are you sure to delete this task: ${task.value}?`);
        if (acceptDelete) {
            let taskList = _cloneDeep(tasks);
            taskList.splice(index, 1);
            setTasks(taskList);
            localStorage.setItem('tasks', JSON.stringify(taskList));
        }
    }

    function handleChangeFilter(option: FilterOption) {
        setFilter(option);
    }

    return (
        <AppWrapper>
            <AppHeading>Todo List</AppHeading>
            <TodoInput
                inputTask={inputTask}
                setInputTask={setInputTask}
                handleAddTask={handleAddTask} />
            <Divider />
            <TodoList tasks={filteredTasks} filter={filter} handleChangeFilter={handleChangeFilter}>
                {
                    filteredTasks.map((task, index) => (
                        <TodoItem
                            key={task.id}
                            task={task}
                            index={index}
                            handleChangeCompletedStatus={handleChangeCompletedStatus}
                            handleEditTask={handleEditTask}
                            handleChangeTask={handleChangeTask}
                            handleDeleteTask={handleDeleteTask} />
                    ))
                }
            </TodoList>
        </AppWrapper>
    );
}

export default App;
