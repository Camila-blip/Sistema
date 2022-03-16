import { useState, useContext } from 'react';
import { Container,  Login, LogoArea, LogoImagem, Form, Input, Button, LinkHref, H1 } from '../../Estilizacao/login';
import { AuthContent } from '../../contexts/auth';

export default function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, loadingAuth } = useContext(AuthContent);

  function handleSubmit(e){
    e.preventDefault();
    if(nome !== '' && email !== '' && password !== ''){
      signUp(email,password,nome)
    }
  }

    return (
      <Container>
        <Login>
          <LogoArea>
            <LogoImagem />
          </LogoArea>
          <Form onSubmit={handleSubmit}>
              <H1>Cadastrar uma conta</H1>
              <Input type="text" placeholder='Seu nome' value={nome} onChange={(e) => setNome(e.target.value)}/>
              <Input type="text" placeholder='email@email.com' value={email}  onChange={ (e) => setEmail(e.target.value)}/>
              <Input type="password" placeholder='*********' value={password} onChange={(e) => setPassword(e.target.value)}/>
              <Button type="submit">{loadingAuth ? 'Carregando...' : 'Cadastrar'}</Button>
          </Form>
          <LinkHref  to="/">Já tem uma conta? Entre</LinkHref>
        </Login>
      </Container>
    );
  }
  