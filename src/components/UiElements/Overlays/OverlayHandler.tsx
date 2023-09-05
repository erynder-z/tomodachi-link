import React from 'react';
import SearchOverlay from './SearchOverlay/SearchOverlay';
import EditUserDataModal from '../../Main/UserOption/EditUserDataModal/EditUserDataModal';
import OptionsCard from '../../UiElements/OptionsCard/OptionsCard';
import GuestAccountOverlay from './GuestAccountOverlay/GuestAccountOverlay';
import { motion, AnimatePresence } from 'framer-motion';

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
    return (
        <div className="relative z-50">
            <AnimatePresence>
                {shouldOverlaysShow.guestAccountOverlay && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <GuestAccountOverlay
                            setShouldOverlaysShow={setShouldOverlaysShow}
                        />
                    </motion.div>
                )}
                {shouldOverlaysShow.searchOverlay && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <SearchOverlay
                            shouldSearchOverlayShow={
                                shouldOverlaysShow.searchOverlay
                            }
                            setShouldOverlaysShow={setShouldOverlaysShow}
                        />
                    </motion.div>
                )}
                {shouldOverlaysShow.editUserDataModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <EditUserDataModal
                            shouldEditUserDataModalShow={
                                shouldOverlaysShow.editUserDataModal
                            }
                            setShouldOverlaysShow={setShouldOverlaysShow}
                        />
                    </motion.div>
                )}
                {shouldOverlaysShow.mobileOptionsModal && (
                    <motion.div
                        key="mobileOptionsModal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="lg:hidden absolute bottom-0 right-0 mt-2 p-2 bg-card dark:bg-cardDark shadow-xl z-10 rounded lg:rounded-lg">
                            <OptionsCard
                                shouldOverlaysShow={shouldOverlaysShow}
                                setShouldOverlaysShow={setShouldOverlaysShow}
                                showSidebar={showSidebar}
                                toggleSidebar={toggleSidebar}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
