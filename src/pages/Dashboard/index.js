import { useEffect, useState } from "react";

import Header from "../../components/Header";
import Title from '../../components/Title';
import firebase from '../../services/firebaseConnection';
import { Content } from '../../Estilizacao/headerStyle';
import Modal from "../../components/Modal";
import { Container, DashboardContainer, LinkNew, Table, BtnMore } from '../../Estilizacao/dashboardStyle';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { format } from 'date-fns';
import { Link } from "react-router-dom";
const listRef =  firebase.firestore().collection('chamados').orderBy('created', 'desc');
export default function Dashboard(){

    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();

    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();

    useEffect(()=>{
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

        loadChamados();
        return () => {

        }
    }, []);

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
            const lastDoc = snapshot.docs[snapshot.docs.length -1];
            setChamados(chamados => [...chamados, ...lista]);
            setLastDocs(lastDoc);
            
        }else{
            setIsEmpty(true);
        }
        setLoadingMore(false);
    }

    async function handleMore(){
       setLoadingMore(true);
       await listRef.startAfter(lastDocs).limit(5)
       .get()
       .then((snapshot)=>{
           console.log(snapshot)
            updateState(snapshot)
       })
    }
    if(loading){
        return(
            <div>
                <Header/>
                <Content>
                    <Title name="Atendimentos">
                        <FiMessageSquare size={25} />
                    </Title>
                    <DashboardContainer>
                        <span>Buscando chamados...</span>
                    </DashboardContainer>
                </Content>
            </div>
        )
    }

    function togglePostModal(item){
        setShowPostModal(!showPostModal); //trocando de true pra false
        setDetail(item);
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
                                {chamados.map((item, index)=>{
                                    return(
                                        <tr key={index}>
                                            <td data-label="Cliente">{item.cliente}</td>
                                            <td data-label="Assunto">{item.assunto}</td>
                                            <td data-label="Status">
                                                <span className="badge" style={{
                                                        backgroundColor: item.status === 'Aberto'? '#999999' : item.status === 'Progresso' ? '#c4bf68' : '#5cb85c'
                                                    }
                                                    }>{item.status}</span>
                                            </td>
                                            <td data-label="Cadastrado">{item.createdFormated}</td>
                                            <td data-label="#">
                                                <button className="action" style={{backgroundColor: '#3583f6'}} onClick={()=> togglePostModal(item)}>
                                                    <FiSearch color="#fff"/>
                                                </button>
                                                <Link to={`/new/${item.id}`} >
                                                    <button className="action" style={{backgroundColor: '#f6a935'}}>
                                                        <FiEdit2 color="#fff"/>
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                               
                            </tbody>
                        </Table>
                        {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15}}>Buscando dados...</h3>}
                        { !loadingMore && !isEmpty &&<BtnMore onClick={handleMore}>Buscar mais</BtnMore> }
                    </>
                )}
               
            </Content>
            {showPostModal &&(
                <Modal
                    conteudo={detail}
                    close={togglePostModal}
                />
            )}
        </section>
    )
}