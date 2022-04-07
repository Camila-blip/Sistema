import { useState, useEffect, useContext } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import firebase from "../../services/firebaseConnection";
import { AuthContent } from "../../contexts/auth";
import { Container, FormProfile } from '../../Estilizacao/profileStyle';
import { Content } from '../../Estilizacao/headerStyle';
import { Status, Div } from '../../Estilizacao/newStyle';
import { FiPlus } from 'react-icons/fi';
import { toast } from "react-toastify";
import {useHistory, useParams} from 'react-router-dom';

export default function New(){
    const{ id } = useParams();
    const history = useHistory();

    const [loadCustomers, setLoadCustomers] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [customerSelected, setCustomerSelected] = useState(0);

    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');

    const [idCustomer, setIdCustomer] = useState(false);

    const {user} = useContext(AuthContent);
    
    useEffect(()=>{
        async function loadCustomers(){
            await firebase.firestore().collection('customers')
            .get()
            .then((snapshot)=>{
                let lista = [];
                snapshot.forEach(doc => {
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                });
                if(lista.length === 0){
                    alert('nenhuma empresa encontrada');
                    setCustomers([{id: '1', nomeFantasia: 'FREELA'}]);
                    setLoadCustomers(false);
                    return;
                }
                setCustomers(lista);
                setLoadCustomers(false);

                if(id){
                    loadId(lista);
                }
            })
            .catch((error)=>{
                toast.error('Ops ocorreu um erro na chamada.')
                setLoadCustomers(false);
                setCustomers([{id: '1', nomeFantasia: ''}]);
            })
        }

        loadCustomers();
    },[id]);

    async function loadId(lista){
        await firebase.firestore().collection('chamados').doc(id)
        .get()
        .then((snapshot)=>{
            setAssunto(snapshot.data().assunto);
            setStatus(snapshot.data().status);
            setComplemento(snapshot.data().complemento);

            let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
            setCustomerSelected(index);
            setIdCustomer(true);
        })
        .catch((err)=>{
            console.log('ERRO NO ID PASSADO:', err)
        })
    }

    async function handleRegister(e){
        e.preventDefault();

        if(idCustomer){
            await firebase.firestore().collection('chamados')
            .doc(id)
            .update({
                cliente: customers[customerSelected].nomeFantasia,
                clienteId: customers[customerSelected].id,
                assunto: assunto,
                status: status,
                complemento: complemento,
                userId: user.uid
            })
            .then(()=>{
                toast.success('Chamado Editado com sucesso!');
                setCustomerSelected(0);
                setComplemento('');
                history.push('/dashboard')
            })
            .catch((err)=>{
                toast.error('Ops erro ao registrar, tente mais tarde.')
                console.log(err)
            })
            return;
        }
    
        await firebase.firestore().collection('chamados')
        .add({
            created: new Date(),
            cliente: customers[customerSelected].nomeFantasia,
            clienteId: customers[customerSelected].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid
        })
        .then(()=>{
            toast.success('Chamado criado com sucesso!');
            setComplemento('');
            setCustomerSelected(0);
        })
        .catch((error)=>{
            toast.error('Ops erro ao registrar, tente mais tarde.');
            console.log(error);
        })
    }

    function handleChangeSelect(e){
        setAssunto(e.target.value);
    }

    function handleOptionChange(e){
        setStatus(e.target.value);
    }

    function handleChangeCustomers(e){
        setCustomerSelected(e.target.value);
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
                            {loadCustomers ? (
                                <input type="text" disabled={true} value="Carregando clientes..." />
                            ) : ( 
                                <select value={customerSelected} onChange={handleChangeCustomers}>
                                    {customers.map((item, index)=>{
                                        return(
                                            <option key={item.id} value={index}>
                                                {item.nomeFantasia}
                                            </option>
                                        )
                                    })}
                                </select>
                            )}
                            
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