import { MdManageSearch } from 'react-icons/md';
import { motion } from 'framer-motion';
import { SearchModeType } from '../../../../types/searchTypes';

type SearchPollsButtonProps = {
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
            guestAccountOverlay: boolean;
        }>
    >;
    setSearchMode: React.Dispatch<React.SetStateAction<SearchModeType>>;
};

export default function SearchPollsButton({
    setShouldOverlaysShow,
    setSearchMode,
}: SearchPollsButtonProps) {
    return (
        <motion.button
            onClick={() => {
                setShouldOverlaysShow({
                    searchOverlay: true,
                    editUserDataModal: false,
                    mobileOptionsModal: false,
                    guestAccountOverlay: false,
                });
                setSearchMode('polls');
            }}
            whileTap={{ scale: 0.97 }}
            className=""
        >
            <MdManageSearch />
        </motion.button>
    );
}
