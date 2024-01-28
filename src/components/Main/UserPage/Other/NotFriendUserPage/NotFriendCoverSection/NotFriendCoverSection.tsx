import { useEffect, useRef, useState } from 'react';
import { getColors } from '../../../../../../utilities/getColors';
import { COVER_OPTIONS } from '../../../SharedComponents/CoverOptions';
import { FinalColor } from 'extract-colors';
import defaultUserpic from '../../../../../../assets/defaultUserpic.png';

type NotFriendCoverSectionProps = {
    firstName: string;
    lastName: string;
    userPicture: string;
    cover?: string;
    backgroundColor: string;
    textColor: string;
    setColorPalette: React.Dispatch<React.SetStateAction<FinalColor[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * React component for displaying the cover section when viewing the page of a non-friend user.
 *
 * @component
 * @param {NotFriendCoverSectionProps} props - The component props.
 * @param {string} props.firstName - The first name of the user.
 * @param {string} props.lastName - The last name of the user.
 * @param {string} props.userPicture - The base64-encoded user picture.
 * @param {string} [props.cover] - The selected cover option.
 * @param {string} props.backgroundColor - The background color for the header section.
 * @param {string} props.textColor - The text color for the header section.
 * @param {React.Dispatch<React.SetStateAction<FinalColor[]>>} props.setColorPalette - State updater for the color palette.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setLoading - State updater for the loading state.
 * @returns {JSX.Element} - JSX element representing the cover section for non-friend users.
 */
export default function NotFriendCoverSection({
    firstName,
    lastName,
    userPicture,
    cover,
    backgroundColor,
    textColor,
    setColorPalette,
    setLoading,
}: NotFriendCoverSectionProps): JSX.Element {
    const [coverImageSrc, setCoverImageSrc] = useState<string>('');

    // Use the default userpic if no userpic is provided. (This should only apply to fake users created with faker.js)
    const userpicSrc = userPicture
        ? `data:image/png;base64,${userPicture}`
        : defaultUserpic;

    const shouldInitialize = useRef(true);

    /**
     * useEffect hook to get a color palette for the cover section based on the selected cover image on component mount.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        if (shouldInitialize.current) {
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
                    .catch(console.error)
                    .finally(() => {
                        setLoading(false);
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
    const CoverImageSection: JSX.Element = (
        <div className="relative row-span-3 flex">
            <img
                src={coverImageSrc}
                alt="cover image"
                className="h-full w-full object-cover rounded-t"
            />
        </div>
    );

    /**
     * JSX Element representing the colored header.
     *
     * @type {JSX.Element}
     */
    const ColoredHeaderSection: JSX.Element = (
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
                src={userpicSrc}
                alt="User avatar"
            />
            <div className="flex flex-col items-start w-3/5">
                <h1 className="text-2xl text-center font-bold h-auto truncate m-0">
                    {firstName} {lastName}'s page
                </h1>
            </div>
        </div>
    );

    /**
     * The rendered NotFriendCoverSection component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="h-[calc(100vh-_5rem)] md:h-96 grid grid-rows-4 rounded-t">
            {CoverImageSection}
            {ColoredHeaderSection}
        </div>
    );
}
