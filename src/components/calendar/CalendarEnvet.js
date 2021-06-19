import React from 'react';

export const CalendarEnvet = ({event}) => {
    const {title, user:{name}} = event;
    return (
        <div>
            <span>{title}</span>
            <p>- {name}</p>
        </div>
    )
}
