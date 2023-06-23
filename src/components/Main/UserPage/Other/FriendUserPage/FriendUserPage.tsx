import React from 'react';
import { OtherUserPageDataTypes } from '../../../../../types/otherUserPageDataTypes';
import { convertDatabaseImageToBase64 } from '../../../../../utilities/convertDatabaseImageToBase64';
import FriendList from '../../SharedComponents/FriendList/FriendList';
import { formatDistanceToNow } from 'date-fns';
import FriendCoverSection from './FriendCoverSection/FriendCoverSection';
import PictureList from '../../SharedComponents/PictureList/PictureList';
import PostList from '../../SharedComponents/PostList/PostList';

type FriendUserPageProps = {
    userPageData: OtherUserPageDataTypes | Record<string, never>;
    isPaginationTriggered: boolean;
};

export default function FriendUserPage({
    userPageData,
    isPaginationTriggered,
}: FriendUserPageProps) {
    const {
        _id,
        firstName,
        lastName,
        userpic,
        cover,
        friends,
        mutualFriends,
        lastSeen,
    } = userPageData || {};

    const userPicture = convertDatabaseImageToBase64(userpic);
    const numberOfFriends = friends.length;
    const lastSeenFormatted = lastSeen
        ? `${formatDistanceToNow(new Date(lastSeen), { addSuffix: true })} `
        : '';

    return (
        <div className="flex flex-col min-h-[calc(100vh_-_5rem)] lg:min-h-full p-4 md:p-0 pb-4 bg-canvas">
            <div className="flex flex-col h-full gap-8">
                <FriendCoverSection
                    _id={_id}
                    firstName={firstName}
                    lastName={lastName}
                    userPicture={userPicture}
                    cover={cover}
                    numberOfFriends={numberOfFriends}
                    lastSeenFormatted={lastSeenFormatted}
                    mutualFriends={mutualFriends}
                />
                <div className="flex flex-col md:grid grid-cols-[1fr,2fr] gap-8">
                    <div className="flex flex-col h-1/4 md:h-auto w-full md:p-4 gap-8 md:mr-auto">
                        <PictureList userId={userPageData._id} />

                        <FriendList friendData={friends} userId={_id} />
                    </div>

                    <div className="flex flex-col gap-8 md:px-4 overflow-auto">
                        <PostList
                            userId={_id}
                            key={_id}
                            isPaginationTriggered={isPaginationTriggered}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
