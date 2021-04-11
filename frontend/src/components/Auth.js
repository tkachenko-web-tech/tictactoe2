import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie/es6';
import { request } from '../helpers';

export function Auth({ authInit }) {
    const cookies = new Cookies();
    const history = useHistory();

    useEffect(async () => {
        let userId = cookies.get('userId');
        if (!userId)
            history.push('/login');
        const { data: user } = await request(`user/${userId}`, 'GET');
        if (!user) {
            cookies.remove('userId');
            history.push('/login');
        } else {
            authInit(userId);
        }
    }, []);

    return (<div style={{ display: false }}>

    </div>);
}
