import styled from 'styled-components';
import logo from '../Assets/logo.png'
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    height: 100%;
    background-color: #121212;
`

export const Login = styled.div`
    background-color: #EAEAEC;
    width: 600px;
    display: flex;
    align-items: center; 
    justify-content: center;
    flex-direction: column;
    @media(max-width: 700px) {
        max-width: 600px;
        width: 100%
    }
`

export const LogoArea = styled.div`
    display: flex;
    align-items: center; 
    justify-content: center;
    background-color: #181c2e;
    width: 100%;
`

export const LogoImagem = styled.img.attrs({
    src: `${logo}`,
    alt: "Sistema"
  })
  `
  padding: 20px;
  max-width: 170px;
  max-height: 130px;
  `
export const Form = styled.form`
    margin-top: 1.5em;
    width: 90%;
    display: flex;
    flex-direction: column;
`
export const H1 = styled.h1`
  text-align: center;
  margin-bottom: 15px;
  color: #181c2e;
`

export const Input = styled.input`
    margin-bottom: 15px;
    height: 35px;
    border-radius: 7px;
    padding: 10px;
    font-size: 15px;
    background-color: #FFF;
    border-color: #fff;
`

export const Button = styled.button`
    height: 35px;
    border: 0;
    border-radius: 7px;
    background-color: #181c2e;
    color: #fff;
    font-size: 1.3em;
`

export const LinkHref = styled(Link)`
  margin: 1.5em 0;
  color: #000;
  cursor: pointer
`