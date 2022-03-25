import { useEffect, useState } from "react";

import Header from "../../components/Header";
import Title from '../../components/Title';
import firebase from '../../services/firebaseConnection';
import { Content } from '../../Estilizacao/headerStyle';
import { Container, DashboardContainer, LinkNew, Table } from '../../Estilizacao/dashboardStyle';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { format } from 'date-fns';
const listRef =  firebase.firestore().collection('chamados').orderBy('created', 'desc');
export default function Dashboard(){

    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();

    useEffect(()=>{
        loadChamados();
        return() => {

        }
    }, []);

    async function loadChamados(){
        await listRef.limit(5)
        .get()
        .then((snapshot)=>{
            updateState(snapshot);
        })
        .catch((error)=>{
            console.log(error);
            setLoadingMore(false);
        })

        setLoading(false);
    }

    async function updateState(snapshot){
        const isCollectionEMpty = snapshot.size === 0;
        if(!isCollectionEMpty){
            let lista = [];
            snapshot.forEach((doc)=>{
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteid,
                    create: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento
                })
            })
            const lastDoc = snapshot.docs[snapshot.doc.length -1];

            setChamados(chamados => [...chamados, ...lista]);
            setLastDocs(lastDoc);
        }else{
            setIsEmpty(true);
        }
        setLoadingMore(false);
    }

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
                        <Table>
                            <thead>
                                <tr>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Cadastrado em</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="Cliente">Sujeito</td>
                                    <td data-label="Assunto">Suporte</td>
                                    <td data-label="Status">
                                        <span className="badge" style={{backgroundColor: '#5cb85c'}}>Em aberto</span>
                                    </td>
                                    <td data-label="Cadastrado">20/06/2021</td>
                                    <td data-label="#">
                                        <button className="action" style={{backgroundColor: '#3583f6'}}>
                                            <FiSearch color="#fff"/>
                                        </button>
                                        <button className="action" style={{backgroundColor: '#f6a935'}}>
                                            <FiEdit2 color="#fff"/>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </>
                )}
               
            </Content>
        </section>
    )
}