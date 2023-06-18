import React from 'react';
import LogoutButton from './LogoutButton/LogoutButton';
import OptionsButton from './OptionsButton/OptionsButton';
import ProfilePageButton from './ProfilePageButton/ProfilePageButton';

type OptionsCardProps = {
    shouldOverlaysShow: {
        searchOverlay: boolean;
        editUserDataModal: boolean;
        mobileOptionsModal: boolean;
    };
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
        }>
    >;
};

export default function OptionsCard({
    shouldOverlaysShow,
    setShouldOverlaysShow,
}: OptionsCardProps) {
    return (
        <div className="flex flex-col gap-4 p-4 lg:w-full lg:flex-row lg:justify-around lg:shadow-lg bg-canvas">
            <ProfilePageButton setShouldOverlaysShow={setShouldOverlaysShow} />
            <OptionsButton
                shouldOverlaysShow={shouldOverlaysShow}
                setShouldOverlaysShow={setShouldOverlaysShow}
            />
            <LogoutButton />
        </div>
    );
}
