import { FC } from "react";
import styled from "styled-components";

const Title = styled.h2`
    text-align: center;
    line-height: 28px;
    color: white;
    background-color: #e11d48;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    text-transform: capitalize;
    @media only screen and (min-width: 768px) {
        font-size: 16px;
        line-height: 32px;
    }
    @media only screen and (min-width: 1280px) {
        font-size: 18px;
        line-height: 36px;
    }
`

interface HeaderTitleProp  {
    title: string
}

const HeaderTitle:FC<HeaderTitleProp> = ({ title }) => (
    <Title>
        {title}
    </Title>
)

export default HeaderTitle;
