import Header from "../../components/Header";
import Title from '../../components/Title';
import { useState } from "react";
import { Content } from '../../Estilizacao/headerStyle';
import { Container, DashboardContainer, LinkNew } from '../../Estilizacao/dashboardStyle';
import { FiMessageSquare, FiPlus } from 'react-icons/fi';

export default function Dashboard(){
    const [chamados, setChamados] = useState([]);

    return(
        <section>
            <Header/> 
            <Content>
                <Title name="Atendimentos">
                    <FiMessageSquare size={25} />
                </Title>
                {chamados.length === 0 ?(
                    <Container>
                    <DashboardContainer>
                        <span>Nenhum chamado registrado...</span>
                        <LinkNew to="/new">
                            <FiPlus size={25} />
                            Novo Chamado
                        </LinkNew>
                    </DashboardContainer>
                    </Container>
                ) : (
                    <>
                        <LinkNew to="/new">
                            <FiPlus size={25} />
                            Novo Chamado
                        </LinkNew>
                    </>
                )}
               
            </Content>
        </section>
    )
}