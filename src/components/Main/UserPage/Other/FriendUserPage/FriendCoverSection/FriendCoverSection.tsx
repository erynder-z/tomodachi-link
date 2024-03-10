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
     * JSX Element header layout for mobile devices
     *
     * @type {JSX.Element}
     */
    const mobileLayout: JSX.Element = (
        <h1 className="md:hidden text-2xl text-center font-bold h-auto flex flex-col md:flex-row">
            <span className="truncate">{firstName}</span>
            <span className="truncate ">{lastName}</span>
        </h1>
    );

    /**
     * JSX Element header layout for non-mobile devices
     *
     * @type {JSX.Element}
     */
    const normalLayout: JSX.Element = (
        <h1 className="hidden md:flex flex-row justify-center text-2xl font-bold h-auto">
            <span className="truncate">
                {firstName} {lastName}
            </span>
        </h1>
    );

    /**
     * JSX Element representing the cover image.
     *
     * @type {JSX.Element}
     */
    const CoverImage: JSX.Element = (
        <div className="relative flex rounded-t">
            <img
                src={coverImageSrc}
                alt="cover image"
                className="h-full w-full object-contain"
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
            className="relative flex flex-col justify-around md:flex-row gap-4 h-full lg:p-4 bg-slate-300 rounded-b p-4"
            style={
                backgroundColor && textColor
                    ? {
                          backgroundColor: backgroundColor,
                          color: textColor,
                      }
                    : {}
            }
        >
            <div className="h-full md:max-w-1/6">
                <img
                    className="max-h-20 rounded-full border-white border-2 m-auto"
                    src={`data:image/png;base64,${userPicture}`}
                    alt="User avatar"
                />
            </div>
            <div className="flex flex-col justify-center md:max-w-sm md:max-w-4/6">
                {mobileLayout}
                {normalLayout}
                <p className="text-center text-xs">
                    {numberOfFriends} friend
                    {numberOfFriends > 1 ? 's' : ''} • {mutualFriends} mutual
                    friend
                    {mutualFriends > 1 ? 's' : ''}
                </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-4 md:max-w-1/6">
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
        <div className="flex flex-col rounded-t">
            {CoverImage}
            {ColoredHeader}
        </div>
    );
}
