import { MdSearch } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

type SearchButtonProps = {
    handleSearchButtonClick: () => void;
};

export default function SearchButton({
    handleSearchButtonClick,
}: SearchButtonProps) {
    return (
        <>
            <motion.button
                data-tooltip-id="navbar-search-tooltip"
                data-tooltip-content="Search Odin-Book"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={handleSearchButtonClick}
                className="flex self-center cursor-pointer text-regularText dark:text-regularTextDark h-full w-full"
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
