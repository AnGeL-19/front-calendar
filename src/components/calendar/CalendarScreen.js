import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import moment from 'moment';

import {Calendar, momentLocalizer} from 'react-big-calendar';

import { CalendarEnvet } from './CalendarEnvet';
import {Navbar} from '../ui/Navbar';
import {AddNewFab} from '../ui/AddNewFab';
import {CalendarModal} from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';

import { uiOpenModal } from "../../actions/ui";

import 'moment/locale/es-mx';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { useSelector } from 'react-redux';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { useEffect } from 'react';
moment.locale('es');


const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(state => state.calendar);
    const {uid} = useSelector(state => state.auth);

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch]);


    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }

    }

    const onDobleClick = () => {
        dispatch(uiOpenModal());
    }

    const onSelect = (e) => {
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView',e);
    }

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent());
    }

    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                view={lastView}
                onSelectSlot={onSelectSlot}
                selectable={true}
                components={{
                    event: CalendarEnvet
                }}
                onDoubleClickEvent={onDobleClick}
                onSelectEvent={onSelect}
                onView={onViewChange}
            />

            <CalendarModal />

            {
                (activeEvent) && <DeleteEventFab />
            }
            


            <AddNewFab />
        </div>
    )
}
