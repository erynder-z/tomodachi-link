import React from 'react';
import { UserDataType } from '../../../../types/userDataType';

type Props = {
    userData: UserDataType | null;
};

export default function NavbarUserOptionsButton({ userData }: Props) {
    const { userpic } = userData || {};
    const base64String = btoa(
        String.fromCharCode(...new Uint8Array(userpic?.data?.data))
    );
    return (
        <div>
            <img
                className="w-8 h-8 object-cover rounded-full mx-auto shadow-lg"
                src={`data:image/png;base64,${base64String}`}
                alt="User avatar"
            />
        </div>
    );
}
