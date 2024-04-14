import { MdSearch } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import useTheme from '../../../../hooks/useTheme';

type SearchButtonProps = {
    handleSearchButtonClick: () => void;
};

/**
 * React component for rendering the search button in the navbar.
 *
 * @component
 * @param {SearchButtonProps} props - The properties of the SearchButton component.
 * @param {Function} props.handleSearchButtonClick - The function to handle the click event when the search button is clicked.
 * @returns {JSX.Element} The rendered SearchButton component.
 */
export default function SearchButton({
    handleSearchButtonClick,
}: SearchButtonProps) {
    const { isMobileDevice } = useTheme();
    /**
     * Render the SearchButton component.
     *
     * @type {JSX.Element}
     */
    return (
        <>
            <motion.button
                data-tooltip-id="navbar-search-tooltip"
                data-tooltip-content="Search Tomodachi-Link"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                data-tooltip-hidden={isMobileDevice}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={handleSearchButtonClick}
                className="flex self-center cursor-pointer text-regularText dark:text-regularTextDark h-6 w-full"
            >
                <MdSearch size="1.5em" />
            </motion.button>
            <Tooltip
                id="navbar-search-tooltip"
                style={{ fontSize: '0.75rem', zIndex: 99 }}
            />
        </>
    );
}
