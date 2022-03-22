import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    background-color: #f8f8f8;
    border-radius: 5px;
    padding: .8em;
    align-items: center;
    flex-direction: row;
    margin-bottom: 1em;
`
export const LabelAvatar = styled.label`
    width: 280px;
    height: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    > input{
        display: none;
    }
    > span{
        z-index: 9;
        position: absolute;
        opacity: 0.7;
        transition: all .5s;
        &:hover{
            opacity: 1;
            transform: scale(1.4);
        }
    }   
    > img{
        margin-bottom: 1em;
        border-radius: 50%;
        object-fit: cover;
    } 
`
export const FormProfile = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    label{
        margin-bottom: .5em;
        font-size: 1.1em;
    }
    
    > input, textarea, select{
        margin-bottom: 1em;
        padding: .7em;
        border: 0;
        border-radius: 5px;
        max-width: 600px;
    }
    > input:disabled{
        cursor: not-allowed;
    }
    button{
        max-width: 600px;
        height: 35px;
        border: 0;
        border-radius: 7px;
        background-color: #181c2e;
        color: #fff;
        font-size: 1.3em;
    }
    textarea{
        height: 95px;
        resize: none;
    }
    input[type="radio"]{
        &:not(:first-child){
            margin-left: 15px;
        }
    }
`
export const Logout = styled.button`
    padding: 8px 20px;
    background-color: transparent;
    border: 1px solid #121212;
    border-radius: 5px;
    font-size: 1.3em;
    display: flex;
    justify-content: center;
    align-items: center;
`