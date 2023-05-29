import React from 'react';
import { InfoType } from '../types/infoType';
import { handleFetchErrors } from './handleFetchErrors';
import { FaExclamationTriangle } from 'react-icons/fa';

export const fetchFeed = async (
    token: string,
    setInfo: (info: InfoType | null) => void,
    skip: number,
    friendList: string[]
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const requestBody = {
            friendList,
        };

        const response = await fetch(`${serverURL}/api/v1/feed?skip=${skip}`, {
            method: 'POST', // use POST instead of GET in order to send the friendList as payload
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            const data = await response.json();
            return data.feed;
        } else {
            handleFetchErrors(response, setInfo);
        }
    } catch (err: unknown) {
        setInfo({
            typeOfInfo: 'bad',
            message: 'Unable to fetch feed!',
            icon: <FaExclamationTriangle />,
        });
    }
};
