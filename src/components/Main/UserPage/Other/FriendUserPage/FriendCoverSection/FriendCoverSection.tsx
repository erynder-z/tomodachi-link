import { useEffect, useRef, useState } from 'react';
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

/**
 * React component for the friend's cover section.
 *
 * @component
 * @param {FriendCoverSectionProps} props - The component props.
 * @returns {JSX.Element} The rendered FriendCoverSection component.
 */
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
}: FriendCoverSectionProps): JSX.Element {
    const [coverImageSrc, setCoverImageSrc] = useState<string>('');

    const shouldInitialize = useRef(true);

    /**
     * useEffect hook to get a color palette for the cover section based on the selected cover image on component mount.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        if (shouldInitialize.current) {
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
        }
        return () => {
            shouldInitialize.current = false;
        };
    }, []);

    /**
     * JSX Element representing the cover image.
     *
     * @type {JSX.Element}
     */
    const CoverImage: JSX.Element = (
        <div className="relative row-span-3 flex rounded-t">
            <img
                src={coverImageSrc}
                alt="cover image"
                className="h-full w-full object-cover"
            />
        </div>
    );

    /**
     * JSX Element representing the colored header.
     *
     * @type {JSX.Element}
     */
    const ColoredHeader: JSX.Element = (
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

            <div className="flex flex-col w-3/5">
                <h1 className="text-2xl text-center font-bold h-auto truncate m-0">
                    {firstName} {lastName}'s page
                </h1>
                <p className="text-center text-xs">
                    {numberOfFriends} friend
                    {numberOfFriends > 1 ? 's' : ''} • {mutualFriends} mutual
                    friend
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
    );

    /**
     * The rendered FriendCoverSection component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="h-[calc(100vh-_5rem)] md:h-96 grid grid-rows-4 rounded-t">
            {CoverImage}
            {ColoredHeader}
        </div>
    );
}
