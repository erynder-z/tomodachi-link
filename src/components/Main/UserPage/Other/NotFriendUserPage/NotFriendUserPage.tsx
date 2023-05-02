import React from 'react';
import { OtherUserPageDataTypes } from '../../../../../types/otherUserPageDataTypes';
import { convertUserPic } from '../../../../../utilities/convertUserPic';
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
    const userPicture = convertUserPic(userpic);

    return (
        <div className="flex flex-col h-full lg:w-5/6 p-4 bg-card">
            <div className="grid grid-cols-5  h-full gap-4">
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
        </div>
    );
}
