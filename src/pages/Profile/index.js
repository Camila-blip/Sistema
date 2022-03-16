import { useState, useContext} from 'react';
import Header from '../../components/Header';
import { Container, FormProfile, LabelAvatar, Logout } from '../../Estilizacao/profileStyle';
import { Content } from '../../Estilizacao/headerStyle';
import Title from '../../components/Title';
import avatar from '../../Assets/avatar.png';
import { AuthContent} from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import {FiSettings, FiUpload} from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Profile(){
    const {user,signOut, setUser, storageUser} = useContext(AuthContent);
    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(e){
        if(e.target.files[0]){
            const image = e.target.files[0];
            if(image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/jpg'){
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            }
            else{
                toast.info('Envie uma imagem do tipo PNG, JPG ou JPEG');
                setImageAvatar(null);
                return null;
            }
        }
    }
    async function handleUpload(){
        const currentUid = user.uid;

        const uploadTask = await firebase.storage()
        .ref(`images/${currentUid}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then(async ()=>{
            console.log('foto enviada com sucesso');

            await firebase.storage().ref(`images/${currentUid}`)
            .child(imageAvatar.name).getDownloadURL()
            .then(async (url) =>{
                let urlFoto = url;

                await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    avatarUrl: urlFoto,
                    nome: nome
                })
                .then(()=>{
                    let data ={
                        ...user,
                        avatarUrl: urlFoto,
                        nome: nome
                    };
                    setUser(data);
                    storageUser(data);
                })
            })
        })
    }

    async function handleSave(e){
        e.preventDefault();
        if(imageAvatar === null && nome !== ''){
            await firebase.firestore().collection('users')
            .doc(user.uid)
            .update({
                nome: nome
            })
            .then(()=>{
                let data ={
                    ...user,
                    nome: nome
                };
                setUser(data);
                storageUser(data);
                toast.success('Dados atualizados com sucesso!')
            })
        }
        else if(nome !== '' && imageAvatar !== null){
            handleUpload();
        }
    }

    return(
        <section>
            <Header/>
            <Content>
                <Title name="Meu perfil">
                    <FiSettings size={25} />
                </Title>
                <Container>
                    <FormProfile onSubmit={handleSave}>
                        <LabelAvatar>
                            <span>
                                <FiUpload color="#fff" size={25}/>
                            </span>
                            <input type="file" accept="image/*" onChange={handleFile}/><br/>
                            { avatarUrl === null ? 
                                <img src={avatar} width="250" height={250}  alt="Foto de perfil do usuario" />
                                :
                                <img src={avatarUrl} width="250" height={250}  alt="Foto de perfil do usuario" />
                            }
                        </LabelAvatar>

                        <label>Nome</label> 
                        <input type="text" value={nome} onChange={(e)=> setNome(e.target.value)}/>

                        <label>Email</label> 
                        <input type="text" value={email} disabled={true} />

                        <button type="submit">Salvar</button>
                    </FormProfile>
                </Container>
                <Container>
                    <Logout onClick={()=> signOut()}>
                        Sair
                    </Logout>
                </Container>
            </Content>
        </section>
    )
}