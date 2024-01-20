import { motion } from 'framer-motion';
import { shuffleArray } from '../../../../../utilities/shuffleArray';
import { CommonFriendType } from '../../../../../types/friendTypes';
import { ImageType } from '../../../../../types/miscTypes';
import { useMemo } from 'react';

type SuggestionCardFriendInfoProps = {
    userpic: ImageType;
    firstName: string;
    lastName: string;
    commonFriends: CommonFriendType[];
};

/**
 * SuggestionCardFriendInfo component for displaying detailed information about a suggested friend.
 *
 * @component
 * @param {SuggestionCardFriendInfoProps} props - The props object.
 * @param {ImageType} props.userpic - The user's profile picture.
 * @param {string} props.firstName - The user's first name.
 * @param {string} props.lastName - The user's last name.
 * @param {CommonFriendType[]} props.commonFriends - An array of common friends with the suggested friend.
 * @return {JSX.Element} The rendered SuggestionCardFriendInfo component.
 */
export default function SuggestionCardFriendInfo({
    userpic,
    firstName,
    lastName,
    commonFriends,
}: SuggestionCardFriendInfoProps): JSX.Element {
    const MAX_DISPLAY_ITEMS = 2;

    /**
     * Shuffled array of common friends for variety in display.
     *
     * @type {CommonFriendType[]}
     */
    const shuffledCommonFriends: CommonFriendType[] = useMemo(
        () => shuffleArray(commonFriends),
        [commonFriends]
    );

    /**
     * Array of common friends to display, limited by MAX_DISPLAY_ITEMS.
     *
     * @type {CommonFriendType[]}
     */
    const displayedCommonFriends: CommonFriendType[] = useMemo(
        () => shuffledCommonFriends?.slice(0, MAX_DISPLAY_ITEMS),
        [shuffledCommonFriends]
    );

    /**
     * Number of additional common friends not displayed.
     *
     * @type {number}
     */
    const additionalItemsCount: number = useMemo(
        () =>
            commonFriends && commonFriends.length > MAX_DISPLAY_ITEMS
                ? commonFriends.length - MAX_DISPLAY_ITEMS
                : 0,
        [commonFriends]
    );

    /**
     * JSX elements representing the list of common friends.
     *
     * @type {JSX.Element[]}
     */
    const commonFriendsList: JSX.Element[] = useMemo(
        () =>
            displayedCommonFriends?.map(
                (commonFriendObject: CommonFriendType) => (
                    <p
                        key={commonFriendObject._id}
                        className="text-xs break-all truncate"
                    >
                        {commonFriendObject.firstName}{' '}
                        {commonFriendObject.lastName}
                    </p>
                )
            ),
        [displayedCommonFriends]
    );

    /**
     * Whether there are additional common friends not displayed.
     *
     * @type {boolean}
     */
    const hasAdditionalItems: boolean = useMemo(
        () => additionalItemsCount > 0,
        [additionalItemsCount]
    );

    /**
     * JSX element representing the friend's profile data.
     *
     * @type {JSX.Element}
     */
    const FriendData: JSX.Element = (
        <>
            <img
                className="w-20 h-20 object-cover mx-auto rounded-full border-4 border-regularText dark:border-regularTextDark"
                src={`data:image/png;base64,${userpic?.data}`}
                alt="User avatar"
            />
            <p className="font-semibold text-sm break-all text-regularText dark:text-regularTextDark truncate">
                {firstName} {lastName}
            </p>
        </>
    );

    /**
     * JSX element representing the common friends section.
     *
     * @type {JSX.Element}
     */
    const CommonFriendsContent: JSX.Element = (
        <div className="flex flex-col">
            <h1 className="font-semibold text-xs leading-tight">
                {`Common friend${commonFriends.length > 1 ? 's' : ''}`}
            </h1>
            {commonFriendsList}
            {hasAdditionalItems && (
                <p className="text-xs">{`and ${additionalItemsCount} more`}</p>
            )}
        </div>
    );

    /**
     * JSX element representing the SuggestionCardFriendInfo component.
     *
     * @type {JSX.Element}
     */
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-4"
        >
            {FriendData}
            {commonFriends && CommonFriendsContent}
        </motion.div>
    );
}
