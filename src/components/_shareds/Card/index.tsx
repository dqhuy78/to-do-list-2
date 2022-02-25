import { FC } from "react";
import styled from "styled-components";

const Wraper = styled.div`
    border: 1px solid #d1d5db;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    width: 100%;
    border-radius: 4px;
    max-width: 512px;
    padding-bottom: 16px;
`

const Card:FC = ({ children }) => {

    return (
        <Wraper>
            {children}
        </Wraper>
    )
}

export default Card;
