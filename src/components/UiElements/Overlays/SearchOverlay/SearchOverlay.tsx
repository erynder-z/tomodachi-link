import { FaTimes } from 'react-icons/fa';
import Search from '../../../Search/Search';

type SearchOverlayProps = {
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
            guestAccountOverlay: boolean;
        }>
    >;
};

export default function SearchOverlay({
    setShouldOverlaysShow,
}: SearchOverlayProps) {
    const handleCloseButtonClick = () => {
        setShouldOverlaysShow({
            searchOverlay: false,
            editUserDataModal: false,
            mobileOptionsModal: false,
            guestAccountOverlay: false,
        });
    };

    const CloseButton = (
        <button
            className="absolute top-0 right-0 m-4 text-regularTextDark font-bold text-lg"
            onClick={handleCloseButtonClick}
        >
            <FaTimes />
        </button>
    );

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  flex flex-col items-center justify-center gap-4 transition-opacity bg-black/80">
            {CloseButton}
            <div className="h-screen w-full md:w-1/3 lg:flex mt-40 justify-center">
                <Search handleCloseButtonClick={handleCloseButtonClick} />
            </div>
        </div>
    );
}
