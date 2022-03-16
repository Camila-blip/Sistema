import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    background-color: #f8f8f8;
    border-radius: 5px;
    padding: .8em;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-bottom: 1em;
`

export const DashboardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    > span{
        margin: 2em 0;
        font-weight: 600;
        font-size: 1.2em;
    }

`
export const LinkNew = styled(Link)`
    float: right;
    margin-bottom: 1.5em;
    background-color: #83bf02;
    color: #fff;
    border: 0;
    padding: .5em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 1.1em;
    border-radius: 6px;
    transition: ease-in 0.2s;
    &:hover{
        background-color: #5fd204;
        transform: scale(1.1);
    }
    > svg{
        margin-right: 5px;
    }
`