import React from 'react';
import { OtherUserPageDataTypes } from '../../../../../types/otherUserPageDataTypes';
import { convertDatabaseImageToBase64 } from '../../../../../utilities/convertDatabaseImageToBase64';
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
    const userPicture = convertDatabaseImageToBase64(userpic);

    return (
        <div className="flex flex-col min-h-[calc(100vh_-_5rem)] lg:min-h-full p-4 md:p-0 pb-4 bg-canvas">
            <NotFriendCoverSection
                firstName={firstName}
                lastName={lastName}
                userPicture={userPicture}
                cover={cover}
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
        </div>
    );
}
