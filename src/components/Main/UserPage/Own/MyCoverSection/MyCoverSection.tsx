import React, { useEffect, useState } from 'react';
import tinycolor from 'tinycolor2';
import { FaImages } from 'react-icons/fa';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';
import { CoverOption } from '../../../../../types/coverOptionTypes';
import { saveCoverImage } from '../../../../../utilities/saveCoverImage';
import { COVER_OPTIONS } from '../../SharedComponents/CoverOptions';
import { getColors } from '../../../../../utilities/getColors';
import ChangeCoverMenu from './ChangeCoverMenu/ChangeCoverMenu';
import useDelayUnmount from '../../../../../hooks/useDelayUnmount';

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
    const [shouldMenuShow, setShouldMenuShow] = useState<boolean>(false);
    const [isSaveButtonShown, setIsSaveButtonShown] = useState<boolean>(false);
    const isMenuMounted = shouldMenuShow;
    const showMenu = useDelayUnmount(isMenuMounted, 150);
    const [initialCover, setInitialCover] = useState<CoverOption | null>(null);

    const backgroundColor = colorPalette[0]?.hex;
    const textColor = tinycolor(backgroundColor).isDark()
        ? '#ffffff'
        : '#000000';

    const handleChangeCoverImage = () => {
        setShouldMenuShow(!shouldMenuShow);
    };

    const handleCoverOptionClick = (coverImage: CoverOption) => {
        setSelectedCover(coverImage);
        setShouldMenuShow(false);
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
        setShouldMenuShow(false);
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
        <div className="h-[calc(100vh_-_5rem)] md:h-96 col-span-2 grid grid-rows-4">
            <div className="relative row-span-3 flex">
                <img
                    src={selectedCover?.image}
                    alt="cover image"
                    className="f-full md:h-80 w-full object-cover"
                />
                {!showMenu && (
                    <button
                        onClick={handleChangeCoverImage}
                        className="absolute right-4 top-4 flex justify-center items-center gap-1 cursor-pointer bg-white px-4 py-2 text-xs bg-opacity-75"
                    >
                        Change cover image <FaImages size="1.5em" />
                    </button>
                )}
                {showMenu && (
                    <ChangeCoverMenu
                        handleCloseButtonCLick={handleCloseButtonCLick}
                        handleCoverOptionClick={handleCoverOptionClick}
                        shouldMenuShow={shouldMenuShow}
                    />
                )}
                {isSaveButtonShown && (
                    <button
                        className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 border-2 border-white"
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
                className="relative row-span-1 flex h-full gap-4 px-4 bg-slate-300 "
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
                    <h1 className="text-2xl text-center font-bold h-auto">
                        My Page
                    </h1>
                </div>
            </div>
        </div>
    );
}
