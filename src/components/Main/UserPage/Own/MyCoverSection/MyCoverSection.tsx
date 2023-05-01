import React, { useEffect, useState } from 'react';
import { extractColors } from 'extract-colors';
import tinycolor from 'tinycolor2';
import { FaImages } from 'react-icons/fa';
import cover1 from '../../../../../assets/cover01.jpg';
import cover2 from '../../../../../assets/cover02.jpg';
import cover3 from '../../../../../assets/cover03.jpg';
import cover4 from '../../../../../assets/cover04.jpg';
import cover5 from '../../../../../assets/cover05.jpg';
import cover6 from '../../../../../assets/cover06.jpg';
import cover7 from '../../../../../assets/cover07.jpg';
import cover8 from '../../../../../assets/cover08.jpg';
import cover9 from '../../../../../assets/cover09.jpg';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';
import { CoverOption } from '../../../../../types/coverOptionTypes';
import { saveCoverImage } from '../../../../../utilities/saveCoverImage';

const COVER_OPTIONS: CoverOption[] = [
    { image: cover1, name: 'cover1' },
    { image: cover2, name: 'cover2' },
    { image: cover3, name: 'cover3' },
    { image: cover4, name: 'cover4' },
    { image: cover5, name: 'cover5' },
    { image: cover6, name: 'cover6' },
    { image: cover7, name: 'cover7' },
    { image: cover8, name: 'cover8' },
    { image: cover9, name: 'cover9' },
];

export default function MyCoverSection() {
    const { token } = useAuth();
    const { currentUserData, handleFetchUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const [selectedCover, setSelectedCover] = useState<CoverOption | null>(
        null
    );
    const [colorPalette, setColorPalette] = useState<any>([]);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [initialCover] = useState<CoverOption | null>(selectedCover);

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

    useEffect(() => {
        if (currentUserData) {
            setSelectedCover(getUserCoverImage() || null);
        }
    }, [currentUserData?.cover]);

    useEffect(() => {
        if (selectedCover) {
            extractColors(selectedCover.image)
                .then((colors) => {
                    const newPalette = colors.map((color) => {
                        const { h, s, l } = tinycolor(color.hex).toHsl();
                        const desaturated = tinycolor({
                            h,
                            s: s * 0.75,
                            l,
                        }).toHexString();
                        return { ...color, hex: desaturated };
                    });
                    setColorPalette(newPalette);
                })
                .catch(console.error);
        }
    }, [selectedCover]);

    return (
        <div className="h-96 col-span-5 grid grid-rows-4">
            <div className="relative row-span-3 flex rounded-t-lg">
                {selectedCover ? (
                    <img
                        src={selectedCover.image}
                        alt="cover image"
                        className="h-full w-full rounded-t-lg"
                    />
                ) : (
                    <div className="row-span-3 flex h-full w-full p-4 gap-4 bg-blue-300"></div>
                )}
                <button
                    onClick={handleChangeCoverImage}
                    className="absolute right-4 top-4 flex justify-center items-center gap-1 cursor-pointer bg-white rounded-lg px-4 py-2 text-xs bg-opacity-75"
                >
                    Change cover image <FaImages size="1.5em" />
                </button>
                {isMenuOpen && (
                    <div className="absolute right-4 top-12 z-10 flex flex-col bg-white border border-gray-200 rounded-lg">
                        {COVER_OPTIONS.map((coverImage, index) => (
                            <div
                                key={index}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() =>
                                    handleCoverOptionClick(coverImage)
                                }
                            >
                                <img
                                    src={coverImage.image}
                                    alt={`cover option ${index + 1}`}
                                    className="w-12 h-12 rounded-lg mr-2 object-cover"
                                />
                                <span>Cover {index + 1}</span>
                            </div>
                        ))}
                    </div>
                )}
                {selectedCover !== initialCover && (
                    <button
                        className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 px-4 transition-all duration-500"
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
                className="relative row-span-1 flex gap-4 px-4 bg-slate-300 transition-all duration-500"
                style={{
                    backgroundColor: `${colorPalette[0]?.hex}`,
                    color: textColor,
                }}
            >
                <div className="flex flex-col justify-center w-full">
                    <h1 className="text-center font-bold h-auto">My Page</h1>
                </div>
            </div>
        </div>
    );
}
