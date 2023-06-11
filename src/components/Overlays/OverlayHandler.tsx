import React, { useEffect, useState } from 'react';
import SearchOverlay from '../Main/SearchOverlay/SearchOverlay';
import useDelayUnmount from '../../hooks/useDelayUnmount';
import EditUserDataModal from '../Main/EditUserDataModal/EditUserDataModal';
import OptionsCard from '../Main/OptionsCard/OptionsCard';

type OverlayHandlerProps = {
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

export default function OverlayHandler({
    shouldOverlaysShow,
    setShouldOverlaysShow,
}: OverlayHandlerProps) {
    const [shouldSearchOverlayShow, setShouldSearchOverlayShow] = useState(
        shouldOverlaysShow.searchOverlay
    );
    const [shouldEditUserDataModalShow, setShouldEditUserDataModalShow] =
        useState(shouldOverlaysShow.editUserDataModal);
    const [shouldMobileOptionsModalShow, setShouldMobileOptionsModalShow] =
        useState(shouldOverlaysShow.mobileOptionsModal);
    const isSearchOverlayMounted = shouldSearchOverlayShow;
    const isEditUserDataModalMounted = shouldEditUserDataModalShow;
    const isMobileOptionsModalMounted = shouldMobileOptionsModalShow;
    const showSearchOverlay = useDelayUnmount(isSearchOverlayMounted, 150);
    const showEditUserDataModal = useDelayUnmount(
        isEditUserDataModalMounted,
        150
    );
    const showMobileOptionsModal = useDelayUnmount(
        isMobileOptionsModalMounted,
        150
    );

    useEffect(() => {
        setShouldSearchOverlayShow(shouldOverlaysShow.searchOverlay);
        setShouldEditUserDataModalShow(shouldOverlaysShow.editUserDataModal);
        setShouldMobileOptionsModalShow(shouldOverlaysShow.mobileOptionsModal);
    }, [shouldOverlaysShow]);

    return (
        <div className="relative z-50">
            {showSearchOverlay && (
                <SearchOverlay
                    shouldSearchOverlayShow={shouldSearchOverlayShow}
                    setShouldOverlaysShow={setShouldOverlaysShow}
                />
            )}
            {showEditUserDataModal && (
                <EditUserDataModal
                    shouldEditUserDataModalShow={shouldEditUserDataModalShow}
                    setShouldOverlaysShow={setShouldOverlaysShow}
                />
            )}
            {showMobileOptionsModal && (
                <div
                    className={`${
                        shouldMobileOptionsModalShow
                            ? 'animate-popInAnimation'
                            : 'animate-popOutAnimation'
                    } lg:hidden absolute bottom-10 right-0 mt-2 p-2 bg-card shadow-xl z-10`}
                >
                    <OptionsCard
                        shouldOverlaysShow={shouldOverlaysShow}
                        setShouldOverlaysShow={setShouldOverlaysShow}
                    />
                </div>
            )}
        </div>
    );
}
