

import { types } from "../types/types";

// {
//     id: new Date(),
//     title: 'Aniversario de no se que',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     bgColor: '#fafafa',
//     notes: 'Comprar toston',
//     user: {
//         _id: '123',
//         name: 'Angell'
//     }
// }

const initialState = {
    events: [],
    activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.eventAddNew:  
            return {
                ...state,
                events: [...state.events, action.payload]
            }

        case types.eventSetActive:
        
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    e => (e.id === action.payload.id) ? action.payload : e)
            }

        case types.eventDelete:
        return {
            ...state,
            events: state.events.filter(
                e => (e.id !== state.activeEvent.id)),
            activeEvent: null
        }

        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }

        case types.eventLogout:
            return {
                ...state,
                events: [],
                activeEvent: null
            }
    
        default:
            return state;
    }

}