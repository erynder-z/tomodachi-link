import React from 'react';
import useFriendData from '../../../../hooks/useFriendData';
import FriendListItem from './FriendListItem/FriendListItem';

export default function MyFriends() {
    const { friendData } = useFriendData();

    const friendList = friendData?.map((friend) => (
        <FriendListItem key={friend._id} friendData={friend} />
    ));

    return (
        <div>
            <h1>Friends</h1>
            <div className="grid grid-cols-3 gap-1">{friendList}</div>
        </div>
    );
}
