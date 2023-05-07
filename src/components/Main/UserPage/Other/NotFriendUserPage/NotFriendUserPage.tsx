import React from 'react';
import { OtherUserPageDataTypes } from '../../../../../types/otherUserPageDataTypes';
import { convertImageToBase64 } from '../../../../../utilities/convertImageToBase64';
import NormalContent from './NormalContent/NormalContent';
import IncomingFriendRequestPendingContent from './IncomingFriendRequestPendingContent/IncomingFriendRequestPendingContent';
import NotFriendCoverSection from './NotFriendCoverSection/NotFriendCoverSection';

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
    const userPicture = convertImageToBase64(userpic);

    return (
        <div className="flex flex-col min-h-[calc(100vh_-_5rem)] p-4 md:p-0 pb-4 lg:w-5/6 bg-card">
            <NotFriendCoverSection
                firstName={firstName}
                lastName={lastName}
                userPicture={userPicture}
                cover={cover}
            />
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
    );
}
