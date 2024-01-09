import { MdManageSearch } from 'react-icons/md';
import { motion } from 'framer-motion';
import { SearchModeType } from '../../../../types/searchTypes';
import { Tooltip } from 'react-tooltip';

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
        <>
            <motion.button
                data-tooltip-id="poll-search-tooltip"
                data-tooltip-content="Search polls"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
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
            <Tooltip id="poll-search-tooltip" style={{ fontSize: '0.75rem' }} />
        </>
    );
}
