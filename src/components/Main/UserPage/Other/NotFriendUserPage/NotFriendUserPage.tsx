import { useRef, useState } from 'react';
import { OtherUserPageDataTypes } from '../../../../../types/otherUserTypes';
import NormalContent from './NormalContent/NormalContent';
import IncomingFriendRequestPendingContent from './IncomingFriendRequestPendingContent/IncomingFriendRequestPendingContent';
import NotFriendCoverSection from './NotFriendCoverSection/NotFriendCoverSection';
import { FinalColor } from 'extract-colors';
import tinycolor from 'tinycolor2';
import { motion, useInView } from 'framer-motion';
import LoadingSpinner from '../../../../UiElements/LoadingSpinner/LoadingSpinner';
import AboutMeSection from '../../SharedComponents/AboutMeSection/AboutMeSection';

type NotFriendUserPageProps = {
    userPageData: OtherUserPageDataTypes | Record<string, never>;
    isFriendRequestPending: {
        incoming: boolean;
        outgoing: boolean;
    };
};

/**
 * React component for displaying the user page when the viewed user is not a friend.
 *
 * @component
 * @param {NotFriendUserPageProps} props - The component props.
 * @param {OtherUserPageDataTypes | Record<string, never>} props.userPageData - Data of the viewed user.
 * @param {{ incoming: boolean; outgoing: boolean; }} props.isFriendRequestPending - Object indicating whether there is an incoming or outgoing friend request.
 * @returns {JSX.Element} - JSX element representing the not friend user page.
 */
export default function NotFriendUserPage({
    userPageData,
    isFriendRequestPending,
}: NotFriendUserPageProps): JSX.Element {
    const { firstName, lastName, userpic, cover } = userPageData || {};

    const [loading, setLoading] = useState(true);
    const [colorPalette, setColorPalette] = useState<FinalColor[]>([]);
    const backgroundColor = colorPalette[0]?.hex;
    const textColor = tinycolor(backgroundColor).isDark()
        ? '#e4e6ea'
        : '#020202';

    const NotFriendPageContentRef = useRef(null);
    const isInView = useInView(NotFriendPageContentRef, { once: true });

    const userPicture = userpic.data;
    const about = userPageData?.about;

    /**
     * JSX Element representing the loading content.
     *
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <div
            className={`${
                loading ? 'flex' : 'hidden'
            } flex-col justify-center items-center w-full h-[calc(100vh_-_2rem)] py-4 bg-background2 dark:bg-background2Dark `}
        >
            <LoadingSpinner message={`Setting up ${firstName}'s page`} />
        </div>
    );

    /**
     * JSX Element representing the user page content.
     *
     * @type {JSX.Element}
     */
    const UserPageContent: JSX.Element = (
        <motion.div
            ref={NotFriendPageContentRef}
            initial={{ y: 10, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`${
                loading
                    ? 'hidden'
                    : 'flex flex-col min-h-[calc(100vh_-_5rem)] lg:min-h-full p-4 md:p-0 pb-4 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark'
            }`}
        >
            <NotFriendCoverSection
                firstName={firstName}
                lastName={lastName}
                userPicture={userPicture}
                cover={cover}
                backgroundColor={backgroundColor}
                textColor={textColor}
                setColorPalette={setColorPalette}
                setLoading={setLoading}
            />
            <div className="animate-popInAnimation flex-grow flex flex-col">
                <div className="p-4">
                    <AboutMeSection aboutName={firstName} aboutText={about} />
                </div>
                <div className="flex-grow flex justify-center items-center">
                    {isFriendRequestPending.incoming ? (
                        <IncomingFriendRequestPendingContent
                            userPageData={userPageData}
                        />
                    ) : (
                        <NormalContent
                            userPageData={userPageData}
                            isFriendRequestPending={isFriendRequestPending}
                        />
                    )}
                </div>
            </div>
        </motion.div>
    );

    /**
     * The rendered FrieNotFriendUserPagendUserPage component.
     *
     * @type {JSX.Element}
     */
    return (
        <>
            {LoadingContent}
            {UserPageContent}
        </>
    );
}
