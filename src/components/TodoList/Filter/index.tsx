import { FC } from "react";
import styled, { css } from "styled-components";

import FilterOption from "models/FilterOption";

const FilterWraper = styled.div`
    display: flex;
    align-items: center;
    margin: 12px 12px 0;
    justify-content: space-between;
    @media only screen and (min-width: 1280px) {
        margin: 16px 12px;
    }
`

interface FilterButtonProp {
    isActive?: boolean
}

const FilterButton = styled.button<FilterButtonProp>`
    width: calc(100% / 3 - 10px);
    font-size: 14px;
    border: none;
    border: 2px solid #10b981;
    background-color: white;
    border-radius: 4px;
    line-height: 24px;
    color: #1e293b;
    cursor: pointer;
    transition: all .2s ease;
    ${props => props.isActive && css`
        border-color: transparent;
        background-color: #10b981;
        color: white;
    `}
`

interface FilterProp {
    filter: FilterOption
    handleChangeFilter: (option: FilterOption) => void
}

const Filter:FC<FilterProp> = ({ filter, handleChangeFilter }) => {

    return (
        <FilterWraper>
            <FilterButton
                isActive={filter === FilterOption.ALL}
                onClick={handleChangeFilter.bind(this, FilterOption.ALL)}
            >
                All Tasks
            </FilterButton>
            <FilterButton
                isActive={filter === FilterOption.INCOMPLETED}
                onClick={handleChangeFilter.bind(this, FilterOption.INCOMPLETED)}
            >
                Incomplete tasks
            </FilterButton>
            <FilterButton
                isActive={filter === FilterOption.COMPLETED}
                onClick={handleChangeFilter.bind(this, FilterOption.COMPLETED)}
            >
                Completed tasks
            </FilterButton>
        </FilterWraper>
    )
}

export default Filter;
