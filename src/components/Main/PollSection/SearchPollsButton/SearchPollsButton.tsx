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

/**
 * Component for a button to initiate searching polls.
 *
 * @component
 * @param {SearchPollsButtonProps} props - The props object.
 * @param {React.Dispatch<React.SetStateAction<{ searchOverlay: boolean; editUserDataModal: boolean; mobileOptionsModal: boolean; guestAccountOverlay: boolean; }>>} props.setShouldOverlaysShow - Function to set overlay visibility.
 * @param {React.Dispatch<React.SetStateAction<SearchModeType>>} props.setSearchMode - Function to set the search mode.
 * @returns {JSX.Element} The rendered SearchPollsButton component.
 */
export default function SearchPollsButton({
    setShouldOverlaysShow,
    setSearchMode,
}: SearchPollsButtonProps): JSX.Element {
    /**
     * The rendered SearchPollsButton component.
     *
     * @type {JSX.Element}
     */
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
