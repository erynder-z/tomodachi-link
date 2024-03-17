import LogoutButton from './LogoutButton/LogoutButton';
import OptionsButton from './OptionsButton/OptionsButton';
import ProfilePageButton from './ProfilePageButton/ProfilePageButton';
import {
    TbLayoutSidebarRightExpand,
    TbLayoutSidebarLeftExpand,
} from 'react-icons/tb';
import ThemeToggle from './ThemeToggle/ThemeToggle';
import ScanLinesToggle from './ScanLinesToggle/ScanLinesToggle';

type OptionsCardProps = {
    shouldOverlaysShow: {
        searchOverlay: boolean;
        editUserDataModal: boolean;
        mobileOptionsModal: boolean;
        guestAccountOverlay: boolean;
        introOverlay: boolean;
    };
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
            guestAccountOverlay: boolean;
            introOverlay: boolean;
        }>
    >;
    resetOverlays: () => void;
    showSidebar?: boolean;
    toggleSidebar?: () => void;
};

/**
 * React component for rendering an options card containing various buttons.
 *
 * @function
 * @param {OptionsCardProps} props - The component props.
 * @param {Object} props.shouldOverlaysShow - Object indicating the visibility of different overlays.
 * @param {boolean} props.shouldOverlaysShow.searchOverlay - Indicates whether the search overlay is visible.
 * @param {boolean} props.shouldOverlaysShow.editUserDataModal - Indicates whether the edit user data modal is visible.
 * @param {boolean} props.shouldOverlaysShow.mobileOptionsModal - Indicates whether the mobile options modal is visible.
 * @param {boolean} props.shouldOverlaysShow.guestAccountOverlay - Indicates whether the guest account overlay is visible.
 * @param {React.Dispatch<React.SetStateAction<Object>>} props.setShouldOverlaysShow - React state dispatch function to update overlay visibility.
 * @param {() => void} props.resetOverlays - Function to reset overlays.
 * @param {boolean} [props.showSidebar] - Indicates whether the sidebar is visible.
 * @param {Function} [props.toggleSidebar] - Function to toggle the visibility of the sidebar.
 * @returns {JSX.Element} The rendered OptionsCard component.
 */
export default function OptionsCard({
    shouldOverlaysShow,
    setShouldOverlaysShow,
    resetOverlays,
    showSidebar,
    toggleSidebar,
}: OptionsCardProps) {
    /**
     * Rendered JSX for the OptionsCard component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="flex flex-col gap-4 md:gap-2 p-4 lg:w-full lg:flex-row lg:justify-around lg:shadow-md bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark rounded-lg z-10">
            {toggleSidebar && (
                <div onClick={toggleSidebar}>
                    {showSidebar ? (
                        <TbLayoutSidebarLeftExpand className="text-2xl" />
                    ) : (
                        <TbLayoutSidebarRightExpand className="text-2xl" />
                    )}
                </div>
            )}
            <ProfilePageButton resetOverlays={resetOverlays} />
            <OptionsButton
                shouldOverlaysShow={shouldOverlaysShow}
                setShouldOverlaysShow={setShouldOverlaysShow}
            />
            <ThemeToggle />
            <ScanLinesToggle />
            <LogoutButton />
        </div>
    );
}
