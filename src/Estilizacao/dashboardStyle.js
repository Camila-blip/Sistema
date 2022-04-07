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
export const BtnMore = styled.button`
    margin: 1.5em 0;
    padding: .5em 1em;
    height: 35px;
    border: 0;
    border-radius: 7px;
    background-color: #181c2e;
    color: #fff;
    font-size: 1.1em;
`

export const Table = styled.table`
    border: 1px solid #ccc;
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    width: 100%;
    table-layout: fixed;
    @media screen and (max-width: 600px){
        border: 0;
    }
    caption{
        font-size: 1.5em;
        margin: .5em 0.75em;
        @media screen and (max-width: 600px){
            font-size: 1.3em;
        }
    }
    @media screen and (max-width: 600px){
        thead{
            border: none;
            clip: rec(0 0 0 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
        }
        
    }
    tr{
        background-color: #f8f8f8;
        border: 1px solid #ddd;
        padding: .35em;
        @media screen and (max-width: 600px){
            border-bottom: 3px solid #ddd;
            margin-bottom: .65em;
        }
    }
    th, td{
        padding: .62em;
        text-align: center;
    }
    th{
        font-size: .85em;
        letter-spacing: .1em;
        text-transform: uppercase;
    }
    @media screen and (max-width: 600px){
        td{
            border-bottom:  1px solid #ddd;
            display: block;
            font-size: .8em;
            text-align: right;
        }
        td::before{
            content: attr(data-label);
            float: left;
            font-weight: bold;
            text-transform: uppercase;
        }
        td:last-child{
            border-bottom: 0;
        }
    }
    td .action{
        border: 0;
        padding: 5px;
        margin-right: 2px;
        align-items: center;
        display: inline-block;
        border-radius: 4px;
        svg{
            vertical-align: middle;
        }
    }
    td .badge{
        padding: 3px;
        border-radius: 3px;
        color: #fff;
    }
   
`