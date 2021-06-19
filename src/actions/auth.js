import Swal from "sweetalert2";
import { fetchConToken, fetchRegistrarUsuario, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventLogout } from "./events";

export const startLogin = (email, password) => {
    return async(dispatch) => {
        const resp = await fetchSinToken('auth/', {email,password}, 'post');
        const body = await resp.json();
    
        if(body.ok){
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            console.log(body);
            if(body.msg){
                Swal.fire('Error', body.msg, 'error');
            }else{
                let er='';
                const errors = body.errors;

                let valores = Object.values(errors); 
                for(let i=0; i< valores.length; i++){
                    er=valores[i].msg+" \n "+er;
                }
                Swal.fire('Error', er, 'error');
            }
            
        }
    }
}

export const starRegister = (name, email, password) => {
    return async (dispatch) => {
        const resp = await fetchRegistrarUsuario('auth/new', {name,email,password}, 'post');
        const body = await resp.json();

        console.log(body);
    
        if(body.ok){
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startCheking = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();
    
        console.log(body);

        if(body.ok){
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
   
            dispatch(checkingFinish());

        }
    }
}

const checkingFinish = () => ({type: types.authChekingFinish});

const login = (user) => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(eventLogout());
        dispatch(logout());
    }
}

const logout = () => ({
    type: types.authLogout
});


