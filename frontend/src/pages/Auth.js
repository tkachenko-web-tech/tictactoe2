import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { cookies, request, UserContext } from '../helpers';

export const AuthPage = ({ Decorated }) => {
    const history = useHistory();
    const [loaded, setLoaded] = useState(false);
    const [userId, setUserId] = useState(UserContext);

    useEffect(() => {
        const init = async () => {
            let userId = cookies.get('userId');
            if (!userId)
                history.push('/login');
            const { data: user } = await request(`user/${userId}`, 'GET');
            if (!user) {
                cookies.remove('userId');
                history.push('/login');
            } else {
                setLoaded(true);
                setUserId(user.id);
            }
        };

        init();
    }, []);

    if (loaded)
        return <UserContext.Provider value={userId}><Decorated></Decorated></UserContext.Provider>;
    return <div></div>
};

export const NotAuthPage = ({ Decorated }) => {
    const history = useHistory();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const init = async () => {
            const userId = cookies.get('userId');
            if (userId) {
                const { data: user } = await request(`user/${userId}`, 'GET');
                if (!user)
                    cookies.remove('userId', { sameSite: true, path: '/' });
                else
                    history.push('/');
            }

            setLoaded(true);
        };

        init();
    }, []);

    if (loaded)
        return <Decorated></Decorated>;
    return <div></div>
};
