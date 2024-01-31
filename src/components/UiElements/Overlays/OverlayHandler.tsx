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

/**
 * React component for managing and rendering different overlays based on the provided state.
 *
 * @function
 * @param {OverlayHandlerProps} props - The component props.
 * @param {Object} props.shouldOverlaysShow - Object representing the state of different overlays.
 * @param {boolean} props.shouldOverlaysShow.searchOverlay - Indicates whether the search overlay should be shown.
 * @param {boolean} props.shouldOverlaysShow.editUserDataModal - Indicates whether the edit user data modal should be shown.
 * @param {boolean} props.shouldOverlaysShow.mobileOptionsModal - Indicates whether the mobile options modal should be shown.
 * @param {boolean} props.shouldOverlaysShow.guestAccountOverlay - Indicates whether the guest account overlay should be shown.
 * @param {React.Dispatch<React.SetStateAction<Object>>} props.setShouldOverlaysShow - React state dispatch function to update overlay visibility.
 * @param {boolean} [props.showSidebar] - Indicates whether the sidebar should be shown.
 * @param {function} [props.toggleSidebar] - Function to toggle the visibility of the sidebar.
 * @param {SearchModeType} props.searchMode - The current search mode type.
 * @returns {JSX.Element} The rendered OverlayHandler component.
 */
export default function OverlayHandler({
    shouldOverlaysShow,
    setShouldOverlaysShow,
    showSidebar,
    toggleSidebar,
    searchMode,
}: OverlayHandlerProps): JSX.Element {
    /**
     * JSX element representing the guest account overlay with a motion effect.
     *
     * @type {JSX.Element}
     */
    const OverlayGuest: JSX.Element = (
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

    /**
     * JSX element representing the search overlay with a motion effect.
     *
     * @type {JSX.Element}
     */
    const OverlaySearch: JSX.Element = (
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

    /**
     * JSX element representing the edit user data modal with a motion effect.
     *
     * @type {JSX.Element}
     */
    const OverlayEditUser: JSX.Element = (
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

    /**
     * JSX element representing the mobile options modal with a motion effect.
     *
     * @type {JSX.Element}
     */
    const OverlayMobileOptions: JSX.Element = (
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

    /**
     * Rendered JSX for the OverlayHandler component.
     *
     * @type {JSX.Element}
     */
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
