import { useState, useEffect, useContext } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContent } from "../../contexts/auth";
import { Container, FormProfile } from '../../Estilizacao/profileStyle';
import { Content } from '../../Estilizacao/headerStyle';
import { Status, Div } from '../../Estilizacao/newStyle';
import { FiPlus } from 'react-icons/fi';

export default function New(){
    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');

    const [user] = useContext(AuthContent);
    
    function handleRegister(e){
        e.preventDefault();
    }

    function handleChangeSelect(e){
        setAssunto(e.target.value);
    }

    function handleOptionChange(e){
        setStatus(e.target.value);
    }

    return(
        <section>
            <Header/>
            <Content>
                <Title name="Novo chamado">
                    <FiPlus size={25}/>
                </Title>
                <Container>
                    <FormProfile onSubmit={handleRegister}>
                        <Div>
                            <label>Cliente</label>
                            <select>
                                <option key={1} value={1}>Sujeito Programador</option>
                            </select>
                        </Div>
                        
                        <Div>
                            <label>Assunto</label>
                            <select value={assunto} onChange={handleChangeSelect}>
                                <option value="Suporte">Suporte</option>
                                <option value="Visita Técnica">Visita Técnica</option>
                                <option value="Financeiro">Financeiro</option>
                            </select>
                        </Div>
                        <Div>
                            <label>Status</label>
                            <Status>
                                <input type="radio" name="radio" value="Aberto" onChange={handleOptionChange} checked={status === "Aberto"} />
                                <span>Em Aberto</span>

                                <input type="radio" name="radio" value="Progresso" onChange={handleOptionChange} checked={status === "Progresso"}/>
                                <span>Progresso</span>

                                <input type="radio" name="radio" value="Atendido" onChange={handleOptionChange} checked={status === "Atendido"}/>
                                <span>Atendido</span>
                            </Status>
                        </Div>
                        <Div>
                            <label>Complemento</label>
                            <textarea type="text" placeholder="Descreva seu problema (opcional)." value={complemento} onChange={(e)=> setComplemento(e.target.value)}/>
                        </Div>
                        <Div>
                            <button type="submit">Registrar</button>
                        </Div>
                    </FormProfile>
                </Container>
            </Content>
        </section>
    )
}