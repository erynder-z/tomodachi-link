import React, { useEffect, useState } from 'react';
import tinycolor from 'tinycolor2';
import { FaImages, FaTimes } from 'react-icons/fa';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';
import { CoverOption } from '../../../../../types/coverOptionTypes';
import { saveCoverImage } from '../../../../../utilities/saveCoverImage';
import { COVER_OPTIONS } from '../../SharedComponents/CoverOptions';
import { getColors } from '../../../../../utilities/getColors';

type MyCoverSectionProps = {
    onFetchComplete: (nameOfComponent: string) => void;
};

export default function MyCoverSection({
    onFetchComplete,
}: MyCoverSectionProps) {
    const { token } = useAuth();
    const { currentUserData, handleFetchUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const [selectedCover, setSelectedCover] = useState<CoverOption | null>(
        null
    );
    const [colorPalette, setColorPalette] = useState<any>([]);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isSaveButtonShown, setIsSaveButtonShown] = useState<boolean>(false);
    const [initialCover, setInitialCover] = useState<CoverOption | null>(null);

    const backgroundColor = colorPalette[0]?.hex;
    const textColor = tinycolor(backgroundColor).isDark()
        ? '#ffffff'
        : '#000000';

    const handleChangeCoverImage = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCoverOptionClick = (coverImage: CoverOption) => {
        setSelectedCover(coverImage);
        setIsMenuOpen(false);
    };

    const handleSaveCoverImage = () => {
        const coverImageName = selectedCover?.name;
        if (token && coverImageName) {
            saveCoverImage(token, coverImageName, handleFetchUserData, setInfo);
            setInitialCover(selectedCover);
        }
    };

    function getUserCoverImage() {
        if (currentUserData) {
            const userCover = currentUserData.cover;
            const cover = COVER_OPTIONS.find((coverImage) => {
                return coverImage.name === userCover;
            });
            return cover;
        }
    }

    const getColorPalette = () => {
        setColorPalette([]);
        if (selectedCover) {
            const image = selectedCover?.image;
            getColors(image)
                .then((palette) => {
                    setColorPalette(palette);
                })
                .catch(console.error);
        }
    };

    const checkSaveButton = () => {
        selectedCover !== initialCover
            ? setIsSaveButtonShown(true)
            : setIsSaveButtonShown(false);
    };

    const handleCloseButtonCLick = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        if (currentUserData) {
            setSelectedCover(getUserCoverImage() || null);
            setInitialCover(getUserCoverImage() || null);
        }
    }, [currentUserData?.cover]);

    useEffect(() => {
        getColorPalette();
        checkSaveButton();
        onFetchComplete('coverSection');
    }, [selectedCover]);

    return (
        <div className="h-[calc(100vh_-_5rem)] md:h-full col-span-10 grid grid-rows-4">
            <div className="relative row-span-3 flex rounded-lg">
                <img
                    src={selectedCover?.image}
                    alt="cover image"
                    className="f-full md:h-80 w-full object-cover rounded-t-lg"
                />
                {!isMenuOpen && (
                    <button
                        onClick={handleChangeCoverImage}
                        className="absolute right-4 top-4 flex justify-center items-center gap-1 cursor-pointer bg-white rounded-lg px-4 py-2 text-xs bg-opacity-75"
                    >
                        Change cover image <FaImages size="1.5em" />
                    </button>
                )}
                {isMenuOpen && (
                    <div className="absolute right-4 top-4 z-10 flex flex-col bg-white border border-gray-200 text-xs">
                        <div className="flex">
                            <span className="flex justify-center items-center p-2">
                                Choose a cover:
                            </span>
                            <button
                                onClick={handleCloseButtonCLick}
                                className="ml-auto p-2 text-red-500 hover:text-red-700 cursor-pointer"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {COVER_OPTIONS.map((coverImage, index) => (
                            <div
                                key={index}
                                className="flex items-center p-2  cursor-pointer hover:bg-red-300"
                                onClick={() =>
                                    handleCoverOptionClick(coverImage)
                                }
                            >
                                <img
                                    src={coverImage.image}
                                    alt={`cover option ${index + 1}`}
                                    className="w-20 h-12 mr-2 object-cover"
                                />
                                <span> {coverImage.name}</span>
                            </div>
                        ))}
                    </div>
                )}
                {isSaveButtonShown && (
                    <button
                        className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 px-4 border-2 border-white"
                        style={{
                            backgroundColor: `${colorPalette[0]?.hex}`,
                            color: textColor,
                        }}
                        onClick={handleSaveCoverImage}
                    >
                        Save
                    </button>
                )}
            </div>
            <div
                className="relative row-span-1 flex h-full gap-4 px-4 rounded-b-lg bg-slate-300 "
                style={
                    colorPalette[0]
                        ? {
                              backgroundColor: `${colorPalette[0].hex}`,
                              color: textColor,
                          }
                        : {}
                }
            >
                <div className="flex flex-col justify-center w-full">
                    <h1 className="text-center font-bold h-auto">My Page</h1>
                </div>
            </div>
        </div>
    );
}
