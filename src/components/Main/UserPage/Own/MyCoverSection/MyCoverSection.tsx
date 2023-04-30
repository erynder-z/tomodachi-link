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

const COVER_OPTIONS = [
    cover1,
    cover2,
    cover3,
    cover4,
    cover5,
    cover6,
    cover7,
    cover8,
    cover9,
];

export default function MyCoverSection() {
    const [selectedCover, setSelectedCover] = useState<string | null>(null);
    const [colorPalette, setColorPalette] = useState<any>([]);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [initialCover] = useState<string | null>(selectedCover);

    const backgroundColor = colorPalette[0]?.hex;
    const textColor = tinycolor(backgroundColor).isDark()
        ? '#ffffff'
        : '#000000';

    const handleChangeCoverImage = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCoverOptionClick = (coverImage: string) => {
        setSelectedCover(coverImage);
        setIsMenuOpen(false);
    };

    const handleSaveCoverImage = () => {
        //
    };

    useEffect(() => {
        if (selectedCover) {
            extractColors(selectedCover)
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
            <div className="relative row-span-3 flex">
                {selectedCover ? (
                    <img
                        src={selectedCover}
                        alt="cover image"
                        className="h-full w-full"
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
                                    src={coverImage}
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
