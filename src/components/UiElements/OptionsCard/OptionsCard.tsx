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

export default function OptionsCard({
    shouldOverlaysShow,
    setShouldOverlaysShow,
    showSidebar,
    toggleSidebar,
}: OptionsCardProps) {
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
            <ProfilePageButton setShouldOverlaysShow={setShouldOverlaysShow} />
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
