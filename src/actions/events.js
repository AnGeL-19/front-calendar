import { types } from "../types/types";
import {fetchConToken} from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepararEvents";
import Swal from "sweetalert2";

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => { // cib get state obtenemos lo que esta en guardado en redux en el state

        const {uid,name} = getState().auth;
        
        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();

            if(body.ok){
                event.id = body.eventoGuardado.id;
                event.user = {
                    _id: uid,
                    name
                }
            }

            dispatch(eventAddNew(event));
        } catch (error) {
            console.log(error);
        }
  
    }
}

export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
}); 


export const eventStartUpdate = (event) => {
    return async (dispatch) => {
        try {
            
            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();

            console.log(body);
            if(body.ok){
                dispatch(eventUpdated(event));
            }else{
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error);
        }
    }
}



const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
}); 

export const eventStartDelte = () => {
    return async (dispatch, getState) => {

        const {id} = getState().calendar.activeEvent;

        try {
            
            const resp = await fetchConToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if(body.ok){
                dispatch(eventDelete());
            }else{
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error);
        }
    }
}

const eventDelete = () => ({
    type: types.eventDelete
}); 

export const eventStartLoading = () => {
    return async (dispatch) => {

        try{
            const resp = await fetchConToken('events');
            const body = await resp.json();

            const events = prepareEvents(body.eventos);

            dispatch(eventLoaded(events))
        }catch(error){
            console.log(error);
        }

    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});


export const eventLogout = () => ({
    type: types.eventLogout
});