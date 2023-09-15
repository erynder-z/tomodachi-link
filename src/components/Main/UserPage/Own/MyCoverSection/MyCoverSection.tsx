import React, { useEffect, useRef, useState } from 'react';
import { FaImages } from 'react-icons/fa';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';
import { CoverOption } from '../../../../../types/coverOptionTypes';
import { saveCoverImage } from '../../../../../utilities/saveCoverImage';
import { COVER_OPTIONS } from '../../SharedComponents/CoverOptions';
import { getColors } from '../../../../../utilities/getColors';
import ChangeCoverMenu from './ChangeCoverMenu/ChangeCoverMenu';
import { FinalColor } from 'extract-colors';
import { AnimatePresence } from 'framer-motion';

type MyCoverSectionProps = {
    onFetchComplete: (nameOfComponent: string) => void;
    backgroundColor: string;
    textColor: string;
    setColorPalette: React.Dispatch<React.SetStateAction<FinalColor[]>>;
};

export default function MyCoverSection({
    onFetchComplete,
    backgroundColor,
    textColor,
    setColorPalette,
}: MyCoverSectionProps) {
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

    const handleChangeCoverImage = () => setShowMenu(!showMenu);

    const handleCoverOptionClick = (coverImage: CoverOption) => {
        setSelectedCover(coverImage);
        setShowMenu(false);
    };

    const handleSaveCoverImage = () => {
        const coverImageName = selectedCover?.name;
        if (token && coverImageName) {
            saveCoverImage(token, coverImageName, handleFetchUserData, setInfo);
            setInitialCover(selectedCover);
            setIsSaveButtonShown(false);
        }
    };

    function getUserCoverImage() {
        return currentUserData
            ? COVER_OPTIONS.find(
                  (coverImage) => coverImage.name === currentUserData.cover
              )
            : null;
    }

    const getColorPalette = async () => {
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

    const checkSaveButton = () =>
        selectedCover !== initialCover
            ? setIsSaveButtonShown(true)
            : setIsSaveButtonShown(false);

    const handleCloseButtonCLick = () => setShowMenu(false);

    useEffect(() => {
        if (currentUserData) {
            const userCoverImage = getUserCoverImage();
            if (userCoverImage) {
                setSelectedCover(userCoverImage);
                setInitialCover(userCoverImage);
            }
        }
    }, [currentUserData?.cover]);

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

    const CoverImage = (
        <img
            src={selectedCover?.image}
            alt="cover image"
            className="h-full w-full object-cover rounded-t"
        />
    );

    const ChangeCoverButton = (
        <button
            onClick={handleChangeCoverImage}
            className="absolute right-4 top-4 flex justify-center items-center gap-1 cursor-pointer bg-background1/80 dark:bg-background1Dark/80 text-regularText dark:text-regularTextDark px-4 py-2 text-xs rounded lg:rounded-lg"
        >
            Change cover image <FaImages size="1.5em" />
        </button>
    );

    const SaveButton = (
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

    const ColoredHeaderSection = (
        <div
            className="relative row-span-1 flex h-full gap-4 px-4 bg-card dark:bg-cardDark rounded-b"
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
                <h1 className="text-2xl text-center font-bold h-auto">
                    My Page
                </h1>
            </div>
        </div>
    );

    return (
        <div className="h-[calc(100vh_-_5rem)] md:h-96 col-span-2 grid grid-rows-4 rounded-t">
            <div className="relative row-span-3 flex">
                {CoverImage}
                {!showMenu && ChangeCoverButton}
                <AnimatePresence>
                    {showMenu && (
                        <ChangeCoverMenu
                            handleCloseButtonCLick={handleCloseButtonCLick}
                            handleCoverOptionClick={handleCoverOptionClick}
                        />
                    )}
                </AnimatePresence>
                {isSaveButtonShown && SaveButton}
            </div>
            {ColoredHeaderSection}
        </div>
    );
}
