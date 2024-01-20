import { MdManageSearch } from 'react-icons/md';
import { motion } from 'framer-motion';
import { SearchModeType } from '../../../../types/searchTypes';
import { Tooltip } from 'react-tooltip';

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

/**
 * SearchPostsButton component to provide a button for initiating post search.
 *
 * @component
 * @param {SearchPostsButtonProps} props - The props object.
 * @param {React.Dispatch<React.SetStateAction<{ searchOverlay: boolean; editUserDataModal: boolean; mobileOptionsModal: boolean; guestAccountOverlay: boolean; }>>} props.setShouldOverlaysShow - Function to control overlay visibility.
 * @param {React.Dispatch<React.SetStateAction<SearchModeType>>} props.setSearchMode - Function to set the search mode.
 * @returns {JSX.Element} The rendered SearchPostsButton component.
 */
export default function SearchPostsButton({
    setShouldOverlaysShow,
    setSearchMode,
}: SearchPostsButtonProps): JSX.Element {
    /**
     * The main SearchPostsButton component.
     *
     * @returns {JSX.Element} The rendered SearchPostsButton component.
     */
    return (
        <>
            <motion.button
                data-tooltip-id="feed-search-tooltip"
                data-tooltip-content="Search posts"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
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
            <Tooltip id="feed-search-tooltip" style={{ fontSize: '0.75rem' }} />
        </>
    );
}
