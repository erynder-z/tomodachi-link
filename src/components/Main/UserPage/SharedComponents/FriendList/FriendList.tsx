import React from 'react';
import FriendListItem from './FriendListItem/FriendListItem';
import { FriendDataType } from '../../../../../types/friendDataType';

type FriendListProps = {
    friendData: FriendDataType[] | null;
};

export default function FriendList({ friendData }: FriendListProps) {
    const friendList = friendData?.map((friend) => (
        <FriendListItem key={friend._id} friendData={friend} />
    ));

    return (
        <div>
            <h1>Friends</h1>
            <div className="flex gap-2">{friendList}</div>
        </div>
    );
}
