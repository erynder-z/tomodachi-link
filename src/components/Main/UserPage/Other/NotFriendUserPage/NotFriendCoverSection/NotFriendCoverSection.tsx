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
     * JSX Element header layout for mobile devices
     *
     * @type {JSX.Element}
     */
    const mobileLayout: JSX.Element = (
        <h1 className="md:hidden text-2xl text-center font-bold h-auto flex flex-col">
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
        <h1 className="hidden md:flex flex-row justify-center items-center text-2xl font-bold h-full m-0">
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
    const CoverImageSection: JSX.Element = (
        <div className="relative flex">
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
            className="relative flex flex-col justify-around items-center md:flex-row gap-4 h-full lg:p-4 bg-slate-300 rounded-b p-4"
            style={
                backgroundColor && textColor
                    ? {
                          backgroundColor: backgroundColor,
                          color: textColor,
                      }
                    : {}
            }
        >
            <div className="w-1/3">
                <img
                    className="max-h-20 rounded-full border-white border-2 m-auto"
                    src={userpicSrc}
                    alt="User avatar"
                />
            </div>
            <div className="flex flex-col items-center md:items-start justify-center w-2/3">
                {mobileLayout}
                {normalLayout}
            </div>
        </div>
    );

    /**
     * The rendered NotFriendCoverSection component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="flex flex-col rounded-t">
            {CoverImageSection}
            {ColoredHeaderSection}
        </div>
    );
}
