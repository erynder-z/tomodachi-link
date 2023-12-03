import SearchOverlay from './SearchOverlay/SearchOverlay';
import EditUserDataModal from '../../Main/UserOption/EditUserDataModal/EditUserDataModal';
import OptionsCard from '../../UiElements/OptionsCard/OptionsCard';
import GuestAccountOverlay from './GuestAccountOverlay/GuestAccountOverlay';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchModeType } from '../../../types/searchTypes';

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
    searchMode: SearchModeType;
};

export default function OverlayHandler({
    shouldOverlaysShow,
    setShouldOverlaysShow,
    showSidebar,
    toggleSidebar,
    searchMode,
}: OverlayHandlerProps) {
    const OverlayGuest = (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <GuestAccountOverlay
                setShouldOverlaysShow={setShouldOverlaysShow}
            />
        </motion.div>
    );

    const OverlaySearch = (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <SearchOverlay
                setShouldOverlaysShow={setShouldOverlaysShow}
                searchMode={searchMode}
            />
        </motion.div>
    );

    const OverlayEditUser = (
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
    );

    const OverlayMobileOptions = (
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
    );

    return (
        <div className="relative z-50">
            <AnimatePresence>
                {shouldOverlaysShow.guestAccountOverlay && OverlayGuest}
                {shouldOverlaysShow.searchOverlay && OverlaySearch}
                {shouldOverlaysShow.editUserDataModal && OverlayEditUser}
                {shouldOverlaysShow.mobileOptionsModal && OverlayMobileOptions}
            </AnimatePresence>
        </div>
    );
}
