import { FC } from "react";
import styled from "styled-components";

import Task from 'models/Task';
import Card from 'components/_shareds/Card';
import HeaderTitle from 'components/_shareds/HeaderTitle';
import Filter from "./Filter";
import FilterOption from "models/FilterOption";

const Paragraph = styled.p.withConfig({
    componentId: 'TodoList'
} as any)`
    text-align: center;
    line-height: 48px;
    margin-top: 12px;
`
const Info = styled.p.withConfig({
    componentId: 'TodoList'
} as any)`
    margin: 12px 12px -6px;
    font-weight: bold;
    color: #6b7280;
    font-size: 14px;
`

interface TodoListProp {
    tasks: Task[],
    filter: FilterOption,
    handleChangeFilter: (option: FilterOption) => void
}

const TodoList:FC<TodoListProp> = ({ children, tasks, filter, handleChangeFilter }) => {

    return (
        <Card>
            <HeaderTitle title="Task List"  />
            <Filter filter={filter} handleChangeFilter={handleChangeFilter}/>
            {
                tasks.length
                ? <>
                    <Info>{tasks.length} task(s)</Info>
                    {children}
                </>
                : <Paragraph>No task found</Paragraph>
            }
        </Card>
    )
}

export default TodoList;
