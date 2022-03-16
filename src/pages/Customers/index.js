import Title from '../../components/Title';
import Header from '../../components/Header';
import { Content } from '../../Estilizacao/headerStyle';
import { FormProfile, Container } from '../../Estilizacao/profileStyle';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';

export default function Customers(){
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setcnpj] = useState('');
    const [endereco, setendereco] = useState('');

    async function handleAdd(e){
        e.preventDefault();
        if(nomeFantasia !== '' && cnpj !== '' && endereco !== ''){
            await firebase.firestore().collection('customers')
            .add({
                nomeFantasia: nomeFantasia,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(()=>{
                setNomeFantasia('')
                setcnpj('')
                setendereco('')
                toast.success('Empresa cadastrada com sucesso')
            })
            .catch((error)=>{
                toast.error('Erro ao cadastrar essa empresa.')
            })
        }else{
            toast.error('Preencha todos os campos!')
        }
         
    }

    return(
        <section>
            <Header />
            <Content>
                <Title name="Novo Cliente">
                    <FiUser size={25} />
                </Title>
                <Container>
                    <FormProfile onSubmit={handleAdd}>
                        <label>Nome fantasia</label>
                        <input type="text" placeholder="Nome da sua empresa" value={nomeFantasia} onChange={(e)=> setNomeFantasia(e.target.value)}/>
                        <label>CNPJ</label>
                        <input type="text" value={cnpj} placeholder="Seu CNPJ" onChange={(e)=> setcnpj(e.target.value)}/>
                        <label>Endereço</label>
                        <input type="text" value={endereco} placeholder="Endereço da empresa" onChange={(e)=> setendereco(e.target.value)}/>
                        <button type="submit">Cadastrar</button>
                    </FormProfile>
                </Container>
            </Content>
        </section>
    )
}