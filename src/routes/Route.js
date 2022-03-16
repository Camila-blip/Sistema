import { useContext } from 'react';
import { Route, Redirect} from 'react-router-dom';
import { AuthContent } from '../contexts/auth';

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}){
    const { signed, loading} = useContext(AuthContent);

    if(loading){
        return(
            <div></div>
        )
    }
    if(!signed && isPrivate){
        return <Redirect to="/" />
    }
    if(signed && !isPrivate){
        return <Redirect to="/dashboard" />
    }
    return(
        <Route
            {...rest}
            render={ props => (
                <Component {...props}/>
            )}
        />
    )
}