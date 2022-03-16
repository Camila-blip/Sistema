import { useState, useContext } from 'react';
import { Container,  Login, LogoArea, LogoImagem, Form, Input, Button, LinkHref, H1 } from '../../Estilizacao/login';
import { AuthContent } from '../../contexts/auth';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, loadingAuth } = useContext(AuthContent);
  function handleSubmit(e){
    e.preventDefault();
    if(email !== '' && password!== ''){
      signIn(email, password);
    }
  }

    return (
      <Container>
        <Login>
          <LogoArea>
            <LogoImagem />
          </LogoArea>
          <Form onSubmit={handleSubmit}>
              <H1>Entrar</H1>
              <Input type="text" placeholder='email@email.com' value={email}  onChange={ (e) => setEmail(e.target.value)}/>
              <Input type="password" placeholder='*********' value={password} onChange={(e) => setPassword(e.target.value)}/>
              <Button type="submit">{loadingAuth ? 'Carregando...' : 'Acessar'}</Button>
          </Form>
          <LinkHref  to="/register">Criar uma conta</LinkHref>
        </Login>
      </Container>
    );
  }
  