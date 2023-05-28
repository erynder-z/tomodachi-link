import React, { useEffect, useState } from 'react';
import tinycolor from 'tinycolor2';
import UnfriendButton from '../UnfriendButton/UnfriendButton';
import { CoverOption } from '../../../../../../types/coverOptionTypes';
import { COVER_OPTIONS } from '../../../SharedComponents/CoverOptions';
import { getColors } from '../../../../../../utilities/getColors';

type FriendCoverSectionProps = {
    _id: string;
    firstName: string;
    lastName: string;
    userPicture: string;
    cover?: string;
    numberOfFriends: number;
    lastSeenFormatted: string;
    mutualFriends: number;
};

export default function FriendCoverSection({
    _id,
    firstName,
    lastName,
    userPicture,
    cover,
    numberOfFriends,
    lastSeenFormatted,
    mutualFriends,
}: FriendCoverSectionProps) {
    const [selectedCover, setSelectedCover] = useState<CoverOption | null>(
        null
    );
    const [colorPalette, setColorPalette] = useState<any>([]);

    const backgroundColor = colorPalette[0]?.hex;
    const textColor = tinycolor(backgroundColor).isDark()
        ? '#ffffff'
        : '#000000';

    function getUserCoverImage() {
        const userCover = cover;
        const displayCover = COVER_OPTIONS.find((coverImage) => {
            return coverImage.name === userCover;
        });
        return displayCover;
    }

    useEffect(() => {
        setSelectedCover(getUserCoverImage() || null);
    }, [cover]);

    useEffect(() => {
        setColorPalette([]);
        if (selectedCover) {
            const image = selectedCover?.image;
            getColors(image)
                .then((palette) => {
                    setColorPalette(palette);
                })
                .catch(console.error);
        }
    }, [selectedCover]);

    return (
        <div className="h-[calc(100vh_-_5rem)] md:h-96 grid grid-rows-4">
            <div className="relative row-span-3 flex">
                <img
                    src={selectedCover?.image}
                    alt="cover image"
                    className="h-full w-full object-cover"
                />
            </div>
            <div
                className="relative row-span-1 flex flex-col md:flex-row gap-4 h-full p-4 bg-slate-300"
                style={
                    colorPalette[0]
                        ? {
                              backgroundColor: `${colorPalette[0].hex}`,
                              color: textColor,
                          }
                        : {}
                }
            >
                <img
                    className="absolute md:relative w-20 h-fit rounded-full bottom-36 md:bottom-10 border-white border-2"
                    src={`data:image/png;base64,${userPicture}`}
                    alt="User avatar"
                />

                <div className="flex flex-col">
                    <h1 className=" text-center font-bold h-auto">
                        {firstName} {lastName}'s page
                    </h1>
                    <p className="text-center text-xs">
                        {numberOfFriends} friend
                        {numberOfFriends > 1 && 's'} • {mutualFriends} mutual
                        friend
                        {mutualFriends > 1 && 's'}
                    </p>
                </div>
                <div className="flex flex-col justify-between gap-4 md:ml-auto ">
                    <div className="text-xs text-center">
                        last seen: {lastSeenFormatted}
                    </div>
                    <UnfriendButton unfriendUserId={_id} />
                </div>
            </div>
        </div>
    );
}
