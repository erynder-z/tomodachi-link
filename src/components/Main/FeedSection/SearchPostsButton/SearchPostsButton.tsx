import { MdManageSearch } from 'react-icons/md';
import { motion } from 'framer-motion';
import { SearchModeType } from '../../../../types/searchTypes';

type SearchPostsButtonProps = {
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

export default function SearchPostsButton({
    setShouldOverlaysShow,
    setSearchMode,
}: SearchPostsButtonProps) {
    return (
        <motion.button
            onClick={() => {
                setShouldOverlaysShow({
                    searchOverlay: true,
                    editUserDataModal: false,
                    mobileOptionsModal: false,
                    guestAccountOverlay: false,
                });
                setSearchMode('posts');
            }}
            whileTap={{ scale: 0.97 }}
            className=""
        >
            <MdManageSearch />
        </motion.button>
    );
}
