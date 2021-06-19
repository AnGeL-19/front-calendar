import React from 'react'
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {


    return (
        <Route {...rest} 
                component={(props) => (
                    (isAuthenticated)
                    ? (<Component {...props} />)
                    : (<Redirect to="/login" />)
                )} />
    )
}


PrivateRoute.prototype = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}