import { useEffect, useRef, useState } from 'react';
import { FaImages } from 'react-icons/fa';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';
import { CoverOption } from '../../../../../types/miscTypes';
import { saveCoverImage } from '../../../../../utilities/saveCoverImage';
import { COVER_OPTIONS } from '../../SharedComponents/CoverOptions';
import { getColors } from '../../../../../utilities/getColors';
import ChangeCoverMenu from './ChangeCoverMenu/ChangeCoverMenu';
import { FinalColor } from 'extract-colors';
import { motion, AnimatePresence } from 'framer-motion';

type MyCoverSectionProps = {
    onFetchComplete: (nameOfComponent: string) => void;
    backgroundColor: string;
    textColor: string;
    setColorPalette: React.Dispatch<React.SetStateAction<FinalColor[]>>;
};

/**
 * React component for rendering the cover section of the user's page.
 *
 * @component
 * @param {MyCoverSectionProps} props - The component props.
 * @param {(nameOfComponent: string) => void} props.onFetchComplete - Callback function to handle fetch completion.
 * @param {string} props.backgroundColor - Background color of the cover section.
 * @param {string} props.textColor - Text color of the cover section.
 * @param {React.Dispatch<React.SetStateAction<FinalColor[]>>} props.setColorPalette - State setter for the color palette.
 * @returns {JSX.Element} The rendered MyCoverSection component.
 */
export default function MyCoverSection({
    onFetchComplete,
    backgroundColor,
    textColor,
    setColorPalette,
}: MyCoverSectionProps): JSX.Element {
    const { token } = useAuth();
    const { currentUserData, handleFetchUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const [selectedCover, setSelectedCover] = useState<CoverOption | null>(
        null
    );
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [isSaveButtonShown, setIsSaveButtonShown] = useState<boolean>(false);
    const [initialCover, setInitialCover] = useState<CoverOption | null>(null);

    const shouldSendFetchCompleteInfo = useRef(true);

    /**
     * Toggles the display of the cover image change menu.
     *
     * @function
     * @returns {void}
     */
    const handleChangeCoverImage = (): void => setShowMenu(!showMenu);

    /**
     * Handles cover option click and sets the selected cover image.
     *
     * @function
     * @param {CoverOption} coverImage - The selected cover option.
     * @returns {void}
     */
    const handleCoverOptionClick = (coverImage: CoverOption): void => {
        setSelectedCover(coverImage);
        setShowMenu(false);
    };

    /**
     * Handles saving the selected cover image.
     *
     * @function
     * @returns {void}
     */
    const handleSaveCoverImage = (): void => {
        const coverImageName = selectedCover?.name;
        if (token && coverImageName) {
            saveCoverImage(token, coverImageName, handleFetchUserData, setInfo);
            setInitialCover(selectedCover);
            setIsSaveButtonShown(false);
        }
    };

    /**
     * Gets the cover image associated with the current user.
     *
     * @function
     * @returns {CoverOption | null} The cover image option.
     */
    const getUserCoverImage = (): CoverOption | null => {
        const foundCover = currentUserData
            ? COVER_OPTIONS.find(
                  (coverImage) => coverImage.name === currentUserData.cover
              )
            : undefined;

        return foundCover !== undefined ? foundCover : null;
    };

    /**
     * Fetches and sets the color palette for the selected cover image.
     *
     * @async
     * @function
     * @returns {Promise<void>}
     */
    const getColorPalette = async (): Promise<void> => {
        setColorPalette([]);
        if (selectedCover) {
            try {
                const palette = await getColors(selectedCover.image);
                if (palette) {
                    setColorPalette(palette as FinalColor[]);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    /**
     * Checks whether the Save button should be shown based on changes.
     *
     * @function
     * @returns {void}
     */
    const checkSaveButton = (): void =>
        selectedCover !== initialCover
            ? setIsSaveButtonShown(true)
            : setIsSaveButtonShown(false);

    /**
     * Closes the cover change menu.
     *
     * @function
     * @returns {void}
     */
    const handleCloseButtonCLick = (): void => setShowMenu(false);

    /**
     * useEffect hook to initialize selected and initial covers on user data changes.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        if (currentUserData) {
            const userCoverImage = getUserCoverImage();
            if (userCoverImage) {
                setSelectedCover(userCoverImage);
                setInitialCover(userCoverImage);
            }
        }
    }, [currentUserData?.cover]);

    /**
     * useEffect hook to handle color palette and fetch completion on selectedCover changes.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        if (selectedCover) {
            getColorPalette();
            checkSaveButton();
            if (shouldSendFetchCompleteInfo.current)
                onFetchComplete('coverSection');

            return () => {
                shouldSendFetchCompleteInfo.current = false;
            };
        }
    }, [selectedCover, initialCover]);

    /**
     * JSX Element representing the cover image.
     *
     * @type {JSX.Element}
     */
    const CoverImage: JSX.Element = (
        <img
            src={selectedCover?.image}
            alt="cover image"
            className="h-full w-full object-cover rounded-t"
        />
    );

    /**
     * JSX Element representing the Change Cover Image button.
     *
     * @type {JSX.Element}
     */
    const ChangeCoverButton: JSX.Element = (
        <motion.button
            onClick={handleChangeCoverImage}
            whileTap={{ scale: 0.97 }}
            className="absolute right-4 top-4 flex justify-center items-center gap-2 cursor-pointer bg-background1/80 dark:bg-background1Dark/80 text-regularText dark:text-regularTextDark px-4 py-2 text-xs rounded lg:rounded-lg"
        >
            Change cover image <FaImages size="1.5em" />
        </motion.button>
    );

    /**
     * JSX Element representing the Save button.
     *
     * @type {JSX.Element}
     */
    const SaveButton: JSX.Element = (
        <button
            className="absolute bottom-4 right-4  py-2 px-4 border-2  rounded lg:rounded-lg"
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
            }}
            onClick={handleSaveCoverImage}
        >
            Save
        </button>
    );

    /**
     * JSX Element representing the colored header section.
     *
     * @type {JSX.Element}
     */
    const ColoredHeaderSection: JSX.Element = (
        <div
            className="relative row-span-1 flex h-full gap-4 px-4 bg-card dark:bg-cardDark rounded-b p-4"
            style={
                backgroundColor && textColor
                    ? {
                          backgroundColor: backgroundColor,
                          color: textColor,
                      }
                    : {}
            }
        >
            <div className="flex flex-col justify-center w-full">
                <h1 className="text-2xl text-center font-bold h-auto m-0">
                    My Page
                </h1>
            </div>
        </div>
    );

    /**
     * JSX Element representing the entire MyCoverSection.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="col-span-2 grid grid-rows-4 rounded-t">
            <div className="relative row-span-3 flex">
                {CoverImage}
                {!showMenu && ChangeCoverButton}
                <AnimatePresence>
                    <ChangeCoverMenu
                        showMenu={showMenu}
                        handleCloseButtonCLick={handleCloseButtonCLick}
                        handleCoverOptionClick={handleCoverOptionClick}
                    />
                </AnimatePresence>
                {isSaveButtonShown && SaveButton}
            </div>
            {ColoredHeaderSection}
        </div>
    );
}
