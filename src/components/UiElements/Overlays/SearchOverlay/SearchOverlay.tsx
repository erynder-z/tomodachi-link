import { FaTimes } from 'react-icons/fa';
import Search from '../../../Search/Search';
import { motion } from 'framer-motion';
import { SearchModeType } from '../../../../types/searchTypes';
import React from 'react';
import useEscapeKey from '../../../../hooks/useEscapeKeyToHandleAction';

type SearchOverlayProps = {
    resetOverlays: () => void;
    searchMode: SearchModeType;
};

/**
 * React component for rendering a search overlay with a close button.
 *
 * @function
 * @param {SearchOverlayProps} props - The component props.
 * @param {() => void} props.resetOverlays - Function to reset overlays.
 * @param {SearchModeType} props.searchMode - The current search mode type.
 * @returns {JSX.Element} The rendered SearchOverlay component.
 */
export default function SearchOverlay({
    resetOverlays,
    searchMode,
}: SearchOverlayProps): JSX.Element {
    /**
     * Handles the click event when the close button is clicked, closing the search overlay.
     *
     * @function
     * @returns {void}
     */
    const handleCloseButtonClick = (): void => {
        resetOverlays();
    };

    /**
     * Custom hook to close the overlay when pressing ESC
     *
     */
    useEscapeKey(handleCloseButtonClick);

    /**
     * JSX element representing the close button with a motion effect.
     *
     * @type {JSX.Element}
     */
    const CloseButton: JSX.Element = (
        <motion.button
            onClick={handleCloseButtonClick}
            whileTap={{ scale: 0.97 }}
            className="absolute top-4 right-4 bg-card dark:bg-cardDark hover:bg-red-500 text-red-500 hover:text-card rounded-full p-1 transition-colors duration-200"
        >
            <FaTimes size="1.25em" />
        </motion.button>
    );

    /**
     * Rendered JSX for the SearchOverlay component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  flex flex-col items-center justify-center gap-4 transition-opacity bg-slate-900/90">
            {CloseButton}
            <div className="h-screen w-full md:w-1/3 lg:flex mt-24 md:mt-40 justify-center">
                <Search
                    handleCloseButtonClick={handleCloseButtonClick}
                    defaultSearchMode={searchMode}
                />
            </div>
        </div>
    );
}
