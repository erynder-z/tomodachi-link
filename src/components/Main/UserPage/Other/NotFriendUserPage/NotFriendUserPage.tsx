import React, { useRef, useState } from 'react';
import { OtherUserPageDataTypes } from '../../../../../types/otherUserPageDataTypes';
import { convertDatabaseImageToBase64 } from '../../../../../utilities/convertDatabaseImageToBase64';
import NormalContent from './NormalContent/NormalContent';
import IncomingFriendRequestPendingContent from './IncomingFriendRequestPendingContent/IncomingFriendRequestPendingContent';
import NotFriendCoverSection from './NotFriendCoverSection/NotFriendCoverSection';
import { FinalColor } from 'extract-colors';
import tinycolor from 'tinycolor2';
import { motion, useInView } from 'framer-motion';
import LoadingSpinner from '../../../../UiElements/LoadingSpinner/LoadingSpinner';

type NotFriendUserPageProps = {
    userPageData: OtherUserPageDataTypes | Record<string, never>;
    isFriendRequestPending: {
        incoming: boolean;
        outgoing: boolean;
    };
};

export default function NotFriendUserPage({
    userPageData,
    isFriendRequestPending,
}: NotFriendUserPageProps) {
    const { firstName, lastName, userpic, cover } = userPageData || {};

    const [loading, setLoading] = useState(true);
    const [colorPalette, setColorPalette] = useState<FinalColor[]>([]);
    const backgroundColor = colorPalette[0]?.hex;
    const textColor = tinycolor(backgroundColor).isDark()
        ? '#e4e6ea'
        : '#020202';

    const NotFriendPageContentRef = useRef(null);
    const isInView = useInView(NotFriendPageContentRef, { once: true });

    const userPicture = convertDatabaseImageToBase64(userpic);

    const LoadingContent = (
        <div
            className={`${
                loading ? 'flex' : 'hidden'
            } flex-col justify-center items-center w-full h-[calc(100vh_-_2rem)] py-4 bg-card dark:bg-cardDark `}
        >
            <LoadingSpinner />
        </div>
    );

    const UserPageContent = (
        <motion.div
            ref={NotFriendPageContentRef}
            initial={{ y: 10, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`${
                loading
                    ? 'hidden'
                    : 'flex flex-col min-h-[calc(100vh_-_5rem)] lg:min-h-full p-4 md:p-0 pb-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark'
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
            <div className="animate-popInAnimation my-auto">
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
        </motion.div>
    );

    return (
        <>
            {LoadingContent}
            {UserPageContent}
        </>
    );
}
