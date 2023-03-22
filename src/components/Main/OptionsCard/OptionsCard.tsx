import React from 'react';
import { UserDataType } from '../../../types/userDataType';
import LogoutButton from './LogoutButton/LogoutButton';
import OptionsButton from './OptionsButton/OptionsButton';
import ProfilePageButton from './ProfilePageButton/ProfilePageButton';

type Props = {
    userData: UserDataType | null;
};

export default function OptionsCard({ userData }: Props) {
    const { _id } = userData || {};

    return (
        <div className="w-full flex justify-around rounded-md shadow-lg p-4 bg-white">
            <ProfilePageButton />
            <OptionsButton />
            <LogoutButton />
        </div>
    );
}
