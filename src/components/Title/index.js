import {Titulo} from '../../Estilizacao/titleStyle';

export default function Title({children, name}){
    return(
        <section>
            <Titulo>
                {children}
                <span>{name}</span>
            </Titulo>
        </section>
    )
}