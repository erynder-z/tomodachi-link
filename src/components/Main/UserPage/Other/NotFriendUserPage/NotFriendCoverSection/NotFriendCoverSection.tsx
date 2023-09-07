import React, { useEffect, useState } from 'react';
import { getColors } from '../../../../../../utilities/getColors';
import { COVER_OPTIONS } from '../../../SharedComponents/CoverOptions';
import { FinalColor } from 'extract-colors';

type NotFriendCoverSectionProps = {
    firstName: string;
    lastName: string;
    userPicture: string;
    cover?: string;
    backgroundColor: string;
    textColor: string;
    setColorPalette: React.Dispatch<React.SetStateAction<FinalColor[]>>;
};

export default function NotFriendCoverSection({
    firstName,
    lastName,
    userPicture,
    cover,
    backgroundColor,
    textColor,
    setColorPalette,
}: NotFriendCoverSectionProps) {
    const [coverImageSrc, setCoverImageSrc] = useState<string>('');

    useEffect(() => {
        const displayCover = COVER_OPTIONS.find(
            (coverImage) => coverImage.name === cover
        );

        if (displayCover) {
            setColorPalette([]);
            getColors(displayCover.image)
                .then((palette) => {
                    if (palette) {
                        setColorPalette(palette as FinalColor[]);
                    }
                })
                .catch(console.error);

            setCoverImageSrc(displayCover.image);
        }
    }, [cover, setColorPalette]);

    return (
        <div className="h-[calc(100vh-_5rem)] md:h-96 grid grid-rows-4 rounded-t">
            <div className="relative row-span-3 flex">
                <img
                    src={coverImageSrc}
                    alt="cover image"
                    className="h-full w-full object-cover rounded-t"
                />
            </div>
            <div
                className="relative row-span-1 flex flex-col md:flex-row gap-4 lg:p-4 bg-slate-300 rounded-b"
                style={
                    backgroundColor && textColor
                        ? {
                              backgroundColor: backgroundColor,
                              color: textColor,
                          }
                        : {}
                }
            >
                <img
                    className="w-20 h-fit object-cover rounded-full relative bottom-10 border-white border-2"
                    src={`data:image/png;base64,${userPicture}`}
                    alt="User avatar"
                />
                <div className="flex flex-col">
                    <h1 className=" text-center font-bold h-auto">
                        {firstName} {lastName}'s page
                    </h1>
                </div>
            </div>
        </div>
    );
}
