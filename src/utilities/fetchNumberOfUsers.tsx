import React from 'react';
import { InfoType } from '../types/infoType';
import { handleFetchErrors } from './handleFetchErrors';
import { FaExclamationTriangle } from 'react-icons/fa';

export const fetchNumberOfUsers = async (
    setInfo: (info: InfoType | null) => void
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(`${serverURL}/api/v1/users/count`);
        if (response.ok) {
            const data = await response.json();
            return data.numberOfUsers;
        } else {
            handleFetchErrors(response, setInfo);
        }
    } catch (err: unknown) {
        setInfo({
            typeOfInfo: 'bad',
            message: 'Unable to fetch users!',
            icon: <FaExclamationTriangle />,
        });
    }
};
