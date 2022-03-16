import styled from 'styled-components';
import Fundo from '../Assets/cover.png';
import { Link } from 'react-router-dom';

export const Sidebar = styled.aside`
    margin: 0;
    padding: 0;
    width: 200px;
    height: 100%;
    background-color: #181C2e;
    position: fixed;
    overflow: auto;
    @media(max-width: 700px) {
        width: 100%;
        height: auto;
        position: relative;
    }  
`
export const Content = styled.article`
    margin-left: 200px;
    @media(max-width: 700px) {
        margin-left: 0;
     } 
`

export const Avatar = styled.div`
    background: url(${Fundo});
    background-color: #181C2e;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 150px;
    padding-top: 30px;
    @media(max-width: 700px) {
       display: none;
    } 
`
export const Img = styled.img`
    border-radius: 50%;
    display: block;
    margin: auto;
    width: 90px;
    height: 90px;
    -webkit-filter: drop-shadow(2px 3px 6px #121212);
    filter: drop-shadow(2px 3px 6px #121212);
    object-fit: cover;
`

export const LinkHref = styled(Link)`
    display: block;
    color: rgba(255,255,255, 0.7);
    padding: 16px;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: ease-in-out .4s;
    &:hover {
        background-color: #121212;
        color: #fff;
    }
    > svg {
        margin-right: .5em;
        color: #fff;
    }
    @media(max-width: 700px) {
       float: left;
    }  
`
