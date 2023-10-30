import { FaTimes } from 'react-icons/fa';
import Search from '../../../Search/Search';
import { motion } from 'framer-motion';

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
        <motion.button
            onClick={handleCloseButtonClick}
            whileTap={{ scale: 0.97 }}
            className="absolute top-4 right-4 bg-card dark:bg-cardDark hover:bg-red-500 text-red-500 hover:text-card rounded-full p-1 transition-colors duration-200"
        >
            <FaTimes size="1.25em" />
        </motion.button>
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
