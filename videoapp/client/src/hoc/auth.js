import React, { useEffect } from 'react';
import { auth } from '../_actions/user_action';
import { useSelector, useDispatch } from "react-redux";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (ComposedClass, reload, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(async response => {
                if (await !response.payload.isAuth) {
                    if (reload) {
                        props.history.push('/register_login')
                    }
                } else {
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }
                    else {
                        if (reload === false) {
                            props.history.push('/')
                        }
                    }
                }
            })
            
        }, [dispatch, props.history, user.googleAuth])

        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return AuthenticationCheck
}

