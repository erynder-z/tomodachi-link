import React, { useEffect, useState } from 'react';
import UnfriendButton from '../UnfriendButton/UnfriendButton';
import { COVER_OPTIONS } from '../../../SharedComponents/CoverOptions';
import { getColors } from '../../../../../../utilities/getColors';
import { FinalColor } from 'extract-colors';

type FriendCoverSectionProps = {
    _id: string;
    firstName: string;
    lastName: string;
    userPicture: string;
    cover?: string;
    backgroundColor: string;
    textColor: string;
    setColorPalette: React.Dispatch<React.SetStateAction<FinalColor[]>>;
    numberOfFriends: number;
    lastSeenFormatted: string;
    mutualFriends: number;
    onFetchComplete: (nameOfComponent: string) => void;
};

export default function FriendCoverSection({
    _id,
    firstName,
    lastName,
    userPicture,
    cover,
    backgroundColor,
    textColor,
    setColorPalette,
    numberOfFriends,
    lastSeenFormatted,
    mutualFriends,
    onFetchComplete,
}: FriendCoverSectionProps) {
    const [coverImageSrc, setCoverImageSrc] = useState<string>('');

    useEffect(() => {
        setColorPalette([]);
        const displayCover = COVER_OPTIONS.find(
            (coverImage) => coverImage.name === cover
        );

        if (displayCover) {
            getColors(displayCover.image)
                .then((palette) => {
                    if (palette) {
                        setColorPalette(palette as FinalColor[]);
                    }
                })
                .catch(console.error)
                .finally(() => {
                    onFetchComplete('coverSection');
                });

            setCoverImageSrc(displayCover.image);
        }
    }, [cover, setColorPalette]);

    return (
        <div className="h-[calc(100vh-_5rem)] md:h-96 grid grid-rows-4 rounded-t">
            <div className="relative row-span-3 flex rounded-t">
                <img
                    src={coverImageSrc}
                    alt="cover image"
                    className="h-full w-full object-cover"
                />
            </div>
            <div
                className="relative row-span-1 flex flex-col md:flex-row gap-4 h-full lg:p-4 bg-slate-300 rounded-b"
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
                    className="absolute md:relative w-20 h-fit rounded-full bottom-36 md:bottom-10 border-white border-2"
                    src={`data:image/png;base64,${userPicture}`}
                    alt="User avatar"
                />

                <div className="flex flex-col">
                    <h1 className="text-2xl text-center font-bold h-auto">
                        {firstName} {lastName}'s page
                    </h1>
                    <p className="text-center text-xs">
                        {numberOfFriends} friend
                        {numberOfFriends > 1 ? 's' : ''} • {mutualFriends}{' '}
                        mutual friend
                        {mutualFriends > 1 ? 's' : ''}
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
