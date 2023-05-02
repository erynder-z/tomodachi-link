import React from 'react';
import { OtherUserPageDataTypes } from '../../../../../types/otherUserPageDataTypes';
import { convertUserPic } from '../../../../../utilities/convertUserPic';
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

    const userPicture = convertUserPic(userpic);
    const numberOfFriends = friends.length;
    const lastSeenFormatted = lastSeen
        ? `${formatDistanceToNow(new Date(lastSeen), { addSuffix: true })} `
        : '';

    return (
        <div className="flex flex-col lg:w-11/12 p-4 bg-card">
            <div className="flex flex-col md:grid grid-cols-5 h-full gap-4">
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
                <div className="col-span-5 flex flex-col md:grid grid-cols-5">
                    <div className="col-span-2 flex flex-col h-1/2 ov">
                        <div className="flex h-1/4 md:h-auto md:p-4">
                            <PictureList key={userPageData._id} />
                        </div>
                        <div className="flex h-1/4 md:h-auto md:p-4">
                            <FriendList
                                key={userPageData._id}
                                friendData={friends}
                            />
                        </div>
                    </div>
                    <div className="col-span-3 flex flex-col gap-4 md:px-4 overflow-auto">
                        <OtherPostList
                            key={userPageData._id}
                            isPaginationTriggered={isPaginationTriggered}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
