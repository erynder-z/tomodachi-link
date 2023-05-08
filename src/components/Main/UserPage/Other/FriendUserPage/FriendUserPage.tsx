import React from 'react';
import { OtherUserPageDataTypes } from '../../../../../types/otherUserPageDataTypes';
import { convertImageToBase64 } from '../../../../../utilities/convertImageToBase64';
import PictureList from '../../SharedComponents/PictureList/PictureList';
import FriendList from '../../SharedComponents/FriendList/FriendList';
import { formatDistanceToNow } from 'date-fns';
import OtherPostList from './OtherPostList/OtherPostList';
import FriendCoverSection from './FriendCoverSection/FriendCoverSection';

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

    const userPicture = convertImageToBase64(userpic);
    const numberOfFriends = friends.length;
    const lastSeenFormatted = lastSeen
        ? `${formatDistanceToNow(new Date(lastSeen), { addSuffix: true })} `
        : '';

    return (
        <div className="flex flex-col min-h-[calc(100vh_-_5rem)] p-4 md:p-0 pb-4 lg:w-11/12 bg-card">
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
                <div className="flex flex-col md:grid grid-cols-10 gap-8">
                    <div className="col-span-3 flex flex-col h-1/2 ov">
                        <div className="flex flex-col h-1/4 md:h-auto md:p-4 gap-8">
                            <PictureList />

                            <FriendList friendData={friends} />
                        </div>
                    </div>
                    <div className="col-start-5 col-span-6 flex flex-col gap-8 md:px-4 overflow-auto">
                        <OtherPostList
                            key={_id}
                            isPaginationTriggered={isPaginationTriggered}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
