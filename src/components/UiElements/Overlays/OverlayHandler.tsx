import React, { useEffect, useState } from 'react';
import SearchOverlay from './SearchOverlay/SearchOverlay';
import useDelayUnmount from '../../../hooks/useDelayUnmount';
import EditUserDataModal from '../../Main/UserOption/EditUserDataModal/EditUserDataModal';
import OptionsCard from '../../UiElements/OptionsCard/OptionsCard';
import GuestAccountOverlay from './GuestAccountOverlay/GuestAccountOverlay';

type OverlayHandlerProps = {
    shouldOverlaysShow: {
        searchOverlay: boolean;
        editUserDataModal: boolean;
        mobileOptionsModal: boolean;
        guestAccountOverlay: boolean;
    };
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
            guestAccountOverlay: boolean;
        }>
    >;
    showSidebar?: boolean;
    toggleSidebar?: () => void;
};

export default function OverlayHandler({
    shouldOverlaysShow,
    setShouldOverlaysShow,
    showSidebar,
    toggleSidebar,
}: OverlayHandlerProps) {
    const [isSearchOverlayMounted, setIsSearchOverlayMounted] = useState(
        shouldOverlaysShow.searchOverlay
    );
    const [isEditUserDataModalMounted, setIsEditUserDataModalMounted] =
        useState(shouldOverlaysShow.editUserDataModal);
    const [isMobileOptionsModalMounted, setIsMobileOptionsModalMounted] =
        useState(shouldOverlaysShow.mobileOptionsModal);
    const [isGuestAccountOverlayMounted, setIsGuestAccountOverlayMounted] =
        useState(shouldOverlaysShow.guestAccountOverlay);

    const showSearchOverlay = useDelayUnmount(isSearchOverlayMounted, 150);
    const showEditUserDataModal = useDelayUnmount(
        isEditUserDataModalMounted,
        150
    );
    const showMobileOptionsModal = useDelayUnmount(
        isMobileOptionsModalMounted,
        150
    );
    const showGuestAccountOverlay = useDelayUnmount(
        isGuestAccountOverlayMounted,
        150
    );

    useEffect(() => {
        setIsSearchOverlayMounted(shouldOverlaysShow.searchOverlay);
        setIsEditUserDataModalMounted(shouldOverlaysShow.editUserDataModal);
        setIsMobileOptionsModalMounted(shouldOverlaysShow.mobileOptionsModal);
        setIsGuestAccountOverlayMounted(shouldOverlaysShow.guestAccountOverlay);
    }, [shouldOverlaysShow]);

    return (
        <div className="relative z-50">
            {showGuestAccountOverlay && (
                <GuestAccountOverlay
                    shouldGuestAccountOverlayShow={
                        shouldOverlaysShow.guestAccountOverlay
                    }
                    setShouldOverlaysShow={setShouldOverlaysShow}
                />
            )}
            {showSearchOverlay && (
                <SearchOverlay
                    shouldSearchOverlayShow={shouldOverlaysShow.searchOverlay}
                    setShouldOverlaysShow={setShouldOverlaysShow}
                />
            )}
            {showEditUserDataModal && (
                <EditUserDataModal
                    shouldEditUserDataModalShow={
                        shouldOverlaysShow.editUserDataModal
                    }
                    setShouldOverlaysShow={setShouldOverlaysShow}
                />
            )}
            {showMobileOptionsModal && (
                <div
                    className={`${
                        shouldOverlaysShow.mobileOptionsModal
                            ? 'animate-popInAnimation'
                            : 'animate-popOutAnimation'
                    } lg:hidden absolute bottom-0 right-0 mt-2 p-2 bg-card dark:bg-cardDark shadow-xl z-10 rounded lg:rounded-lg`}
                >
                    <OptionsCard
                        shouldOverlaysShow={shouldOverlaysShow}
                        setShouldOverlaysShow={setShouldOverlaysShow}
                        showSidebar={showSidebar}
                        toggleSidebar={toggleSidebar}
                    />
                </div>
            )}
        </div>
    );
}
